# -*- coding: utf-8 -*-
{
    'name': "Select All Companies",

    'summary': """
        Select All Companies""",

    'description': """
        This module is to select all companies in multicompany mode in Odoo 14 to simplify the way of selecting companies instead of selecting them one by one which is a waste of time.
    """,

    'author': "Hadi Masri",
    'version': '1.0',

    'depends': ['base'],

    'data': [
        'views/views.xml',
    ],
    
    'qweb': [
        "static/src/xml/select_companies.xml"
    ],
    'license': "OPL-1",
    'support': "ibrahim.masri1@gmail.com",
    'price': "24.99",
    'currency': "EUR",
    'images': ["static/src/description/icon.png",
              "static/src/description/img1_screenshot.png",
              "static/src/description/img2.png"],
}
