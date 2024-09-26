import jwt
import os
import datetime
from django.conf import settings
from django.http import JsonResponse
from functools import wraps
from jwt.exceptions import ExpiredSignatureError,InvalidTokenError

def generate_jwt_token(user):
    # secret_key = 'mysecretkey'
    payload={
        'UserId':str(user.UserId),
        'username':user.username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)  
    }
    token = jwt.encode(payload, settings.JWT_SECRET, algorithm='HS256')
    return token


def check_jwt_token(view_func):
    @wraps(view_func)
    def wrapped_view(request,*args,**kwargs):
        auth_header=request.headers.get('Authorization',None)

        if not auth_header:
            return JsonResponse({"message":"Authorization headers missing"},status=401)
        
        token=auth_header.split(" ")[1] if " " in auth_header else None
        if not token:
            return JsonResponse({"message":"Token missing"},status=401)
        
        try:
            decode_token= jwt.decode(token,settings.JWT_SECRET,algorithms=['HS256'])
            request.user=decode_token
        except ExpiredSignatureError:
            return JsonResponse({"message":"token expired"},status=401)
        except InvalidTokenError:
            return JsonResponse({"message":"invalid token"},status=401)
        
        return view_func(request,*args,**kwargs)
    return wrapped_view