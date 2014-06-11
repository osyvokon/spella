#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <QxtCore/QxtLocale>
#include <QxtWidgets/QxtWindowSystem>
#include <QxtWidgets/QxtGlobalShortcut>
#include <QLocale>
#include <QMessageBox>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    QxtLocale locale;
    locale.currencyForCountry(QLocale::Russia);
    QxtGlobalShortcut* shortcut = new QxtGlobalShortcut(this);
    connect(shortcut, SIGNAL(activated()), this, SLOT(activated()));
    shortcut->setShortcut(QKeySequence("Ctrl+Shift+F12"));
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::activated()
{
    QMessageBox::aboutQt(this);
}
