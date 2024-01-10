# strategy pattern
from abc import ABC, abstractmethod
import re

class ValidationStrategy(ABC):
    @abstractmethod
    def validate(self, data):
        pass

class EmailValidationStrategy(ValidationStrategy):
    def validate(self, email):
        return re.match(r'\b[A-Za-z0-9._%+-]+@[a-z.]+\.[a-z]{2,}\b', email) is not None