# -*- coding: utf-8 -*-
""" Local settings file for todofu project

"""
DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'todofu',
        'USER': 'todofu',
        'PASSWORD': 'todofu',
	'HOST': 'localhost',
    }
}
