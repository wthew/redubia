import sqlalchemy as sql
from sqlalchemy.orm import relationship
import sqlalchemy.dialects.postgresql as pg
from api.database import Base, engine, Session, EntityNamespace
from api.lib import run_on_init_app

class Entity():
    id = sql.Column(pg.UUID, nullable=False, primary_key=True, server_default=sql.text('gen_random_uuid()'))

class MediaEntity(Base, Entity):
    """Media model."""
    __tablename__ = 'media_entity'

    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, server_default=sql.text('now()'))
    namespace = sql.Column(sql.Enum(EntityNamespace), nullable=False)
    name = sql.Column(pg.TEXT, nullable=False)
    cover_url = sql.Column(pg.TEXT)
    categories = relationship('MediaCategories', lazy='subquery')
    

class MediaCategories(Base, Entity):
    """Media categories model."""
    __tablename__ = 'media_categories'

    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, server_default=sql.text('now()'))
    category = sql.Column(sql.TEXT, nullable=False)
    media_entity_id = sql.Column(pg.UUID, sql.ForeignKey('media_entity.id'), nullable=False)
    media_entity = relationship('MediaEntity')


class DubbingCast(Base, Entity):
    """Dubbing cast model."""
    __tablename__ = 'dubbing_cast'

    created_at = sql.Column(pg.TIMESTAMP(timezone=True), nullable=False, server_default=sql.text('now()'))
    watchable_id = sql.Column(pg.UUID, sql.ForeignKey('media_entity.id'), nullable=False)
    watchable = relationship('MediaEntity', foreign_keys=[watchable_id])
    voice_actor_id = sql.Column(pg.UUID, sql.ForeignKey('media_entity.id'))
    voice_actor = relationship('MediaEntity', foreign_keys=[voice_actor_id])
    character_id = sql.Column(pg.UUID, sql.ForeignKey('media_entity.id'))
    character = relationship('MediaEntity', foreign_keys=[character_id])
    label = sql.Column(pg.TEXT)



# ensure rls for all tables
@run_on_init_app
def ensure_all_tables_exists():
    Base.metadata.create_all(engine)

@run_on_init_app
def ensure_row_level_security():
    def is_rls_enabled(session, table_name):
        query = sql.text("""
            SELECT relrowsecurity
            FROM pg_class
            WHERE oid = to_regclass(:table_name);
        """)
        result = session.execute(query, {"table_name": table_name}).fetchone()
        if result:
            return result[0]  # Retorna True ou False

        return False  # Se a tabela não for encontrada

    def enable_rls_if_needed(session, table_name):
        if not is_rls_enabled(session, table_name):
            session.execute(sql.text(f"ALTER TABLE {table_name} ENABLE ROW LEVEL SECURITY"))
            session.commit()
            
        print(f"RLS habilitado para a tabela {table_name}")

    for name in Base.metadata.tables.keys():
        enable_rls_if_needed(Session, name)
    
    print('')
