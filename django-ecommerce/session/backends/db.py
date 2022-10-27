from django.contrib.sessions.backends.db import SessionStore as DBStore

class SessionStore(DBStore):

    def __init__(self, session_key=None):
        super().__init__(session_key)
        self.__dict__['order'] = None #definie order a None

    def __setattr__(self, name, value):
        if name == 'order':
            self.__dict__['modified'] = True #si on a modifier order, set modified a True et donc enregistrement des element dans le bacck
        super().__setattr__(name, value)

    @classmethod
    def get_model_class(cls):
        return CustomSession

    #si on a un order, return false
    def is_empty(self):
        "Return True when there is no session_key and the session is empty."
        try:
            empty = super().is_empty() and (self.order is None)
            return empty
        except AttributeError:
            print("error")
            return True

    #appeler lors de la creation du model
    def create_model_instance(self, data):
        obj = super().create_model_instance(data)
        obj.order = self.order
        return obj

    #appeler lors du chargement de bdd, on initialise order
    def load(self):
        s = self._get_session_from_db()
        self.order = s.order
        return self.decode(s.session_data) if s else {}


from session.models import CustomSession