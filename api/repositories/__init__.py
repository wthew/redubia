from abc import ABC, abstractmethod

class RepositoryBase(ABC):
    @abstractmethod
    def get(self, identifier):
        pass

    @abstractmethod
    def add(self, entity):
        pass

    @abstractmethod
    def all(self, criteria):
        pass

