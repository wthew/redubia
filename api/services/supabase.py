from os import environ
from supabase import create_client

supabase_client = create_client(
    supabase_url=environ.get('SUPABASE_URL'),
    supabase_key=environ.get('SUPABASE_KEY'),
)
