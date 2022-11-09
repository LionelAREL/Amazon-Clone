from pathlib import Path
import botocore 
import botocore.session 
from aws_secretsmanager_caching import SecretCache, SecretCacheConfig 
import json
import os
from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG',cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS',default='*').split(" ")

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'rest_framework',
    'django_filters',
    'corsheaders',
    'api',
    'authentification',
    'session',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

client = botocore.session.get_session().create_client(service_name='secretsmanager',region_name='eu-west-3')
cache_config = SecretCacheConfig()
cache = SecretCache( config = cache_config, client = client)

secret_name = 'amazon/clone'

try :
    secret = json.loads(cache.get_secret_string(secret_name))['password']
except Exception as e:
    secret = None

###DATABASE
SESSION_ENGINE = config('SESSION_ENGINE')
DATABASES = {
    'default': {
        'ENGINE': config('DB_ENGINE'),
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': secret if(secret is not None) else '',
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = config('LANGUAGE_CODE')

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'authentification.User'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
}

###CORS
CSRF_TRUSTED_ORIGINS = config('CSRF_TRUSTED_ORIGINS').split(" ")
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS').split(" ")

CORS_ALLOW_CREDENTIALS = config('CORS_ALLOW_CREDENTIALS',default=True,cast=bool)
CORS_EXPOSE_HEADERS = ['Content-Type', 'X-CSRFToken']


CSRF_COOKIE_SAMESITE = config('CSRF_COOKIE_SAMESITE',default='None')
SESSION_COOKIE_SAMESITE = config('SESSION_COOKIE_SAMESITE',default='None')

CSRF_COOKIE_HTTPONLY = config('CSRF_COOKIE_HTTPONLY',default=False,cast=bool)
SESSION_COOKIE_HTTPONLY = config('SESSION_COOKIE_HTTPONLY',default=False,cast=bool)

CSRF_COOKIE_SECURE = config('CSRF_COOKIE_SECURE',default=True,cast=bool)
SESSION_COOKIE_SECURE = config('SESSION_COOKIE_SECURE',default=True,cast=bool)

CORS_ORIGIN_ALLOW_ALL = config('CORS_ORIGIN_ALLOW_ALL',default=True,cast=bool)
	
SESSION_COOKIE_DOMAIN = config('SESSION_COOKIE_DOMAIN')
CSRF_COOKIE_DOMAIN = config('CSRF_COOKIE_DOMAIN')


##STORAGE
DEFAULT_FILE_STORAGE = config('DEFAULT_FILE_STORAGES')
STATICFILES_STORAGE = config('STATICFILES_STORAGES')

### AWS
AWS_S3_ACCESS_KEY_ID = config('AWS_S3_ACCESS_KEY_ID')
AWS_S3_SECRET_ACCESS_KEY = config('AWS_S3_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')
AWS_S3_SIGNATURE_VERSION = config('AWS_S3_SIGNATURE_VERSION')
AWS_S3_REGION_NAME = config('AWS_S3_REGION_NAME')
AWS_S3_CUSTOM_DOMAIN = config('AWS_S3_CUSTOM_DOMAIN')
AWS_LOCATION = config('AWS_LOCATION')

### STATIC
STATIC_URL = config('STATIC_URL')
STATIC_ROOT = BASE_DIR / config('STATIC_ROOT')
MEDIA_ROOT = BASE_DIR / 'staticmedias/'