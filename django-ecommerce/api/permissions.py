from rest_framework.permissions import IsAdminUser, BasePermission, SAFE_METHODS, IsAuthenticated, BasePermission
from api.utils import get_or_set_order

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            request.user and
            request.user.is_staff
        )



class AddressRequired(BasePermission):
    message = 'address required'
    def has_permission(self, request, view): 
        if get_or_set_order(request).address is not None:
            return True
        else:
            return False

class ArticleRequired(BasePermission):
    message = 'article required'
    def has_permission(self, request, view): 
        if get_or_set_order(request).orderItems.all().exists():
            return True
        else:
            return False