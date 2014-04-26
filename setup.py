import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))

requires = [
    'flask',
    'flask-crossdomain',
    ]

setup(name='spella',
      version='0.0',
      description='spellchecker.com.ua utilities',
      classifiers=[
        ],
      author='Oleksiy Syvokon',
      author_email='oleksiy.syvokon@gmail.com',
      url='',
      keywords='ukrainian spellchecker proofreading',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      install_requires=requires,
      )
