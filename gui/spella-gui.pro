#-------------------------------------------------
#
# Project created by QtCreator 2014-06-02T19:05:33
#
#-------------------------------------------------

QT       += core gui x11extras

CONFIG   += qxt
QXT      += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = spella-gui
TEMPLATE = app


SOURCES += main.cpp\
        mainwindow.cpp

HEADERS  += mainwindow.h

FORMS    += mainwindow.ui


INCLUDEPATH += $$PWD/../../../opensource/libqxt/include
DEPENDPATH += $$PWD/../../../opensource/libqxt/include

INCLUDEPATH += $$PWD/../../../opensource/libqxt/src/core
INCLUDEPATH += $$PWD/../../../opensource/libqxt/src/widgets

win32:CONFIG(release, debug|release): LIBS += -L$$PWD/../../../opensource/libqxt/bin/ -lQxtCore -lQxtWidgets
else:win32:CONFIG(debug, debug|release): LIBS += -L$$PWD/../../../opensource/libqxt/bin/ -lQxtCore -lQxtWidgets
else:unix: LIBS += -L$$PWD/../../../opensource/libqxt/bin/  -lQxtCore


win32:CONFIG(release, debug|release): LIBS += -L$$PWD/../../../opensource/libqxt/bin/ -lQxtCore -lQxtWidgets
else:win32:CONFIG(debug, debug|release): LIBS += -L$$PWD/../../../opensource/libqxt/bin/ -lQxtCore -lQxtWidgets
else:unix: LIBS += -L$$PWD/../../../opensource/libqxt/bin/  -lQxtWidgets

INCLUDEPATH += $$PWD/../../../opensource/libqxt/bin
DEPENDPATH += $$PWD/../../../opensource/libqxt/bin
