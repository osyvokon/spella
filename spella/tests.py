#!/usr/bin/env python3.3
# encoding: utf-8
import unittest
import requests
import json
import xml.etree.cElementTree as etree


class SpellcheckedText(object):

    def __init__(self, text, errors=None):
        self.text = text
        self.errors = errors

    @staticmethod
    def from_languagetool_response(text, response):
        xml = etree.fromstring(response.encode('utf-8'))
        errors =  []
        for error in xml.findall("error"):
            errors.append({
                "msg": error.attrib.get("msg"),
                "suggest": error.attrib.get("replacements").split("#") or [],
                })

        return SpellcheckedText(text, errors)


class BaseTestCase(unittest.TestCase):
    def setUp(self):
        self.api_url = "http://spellchecker.com.ua/"

    def check(self, text):
        data = json.dumps({"text": text})
        headers = {'Content-Type': 'application/json'}
        r = requests.post(self.api_url + '/api/check', data, headers=headers)
        xml = r.json()['checked'][0]
        return SpellcheckedText.from_languagetool_response(text, xml)

    def suggest(self, text):
        """Returns flattened list of suggestions for a text.
        """

        t = self.check(text)
        suggestions = [x['suggest'] for x in t.errors]

        return sum(suggestions, [])
    
    def assertSuggests(self, misspelled, expected_replacement):
        suggestions = self.suggest(misspelled)
        if expected_replacement not in suggestions:
            print ("Expected: %s" % expected_replacement)
            print ("Found:    %s" % ', '.join(suggestions))
            self.fail("Expected suggestion not found")


class Test_TranslateRussian(BaseTestCase):

    def test_correctly_spelled_russian_words(self):
        # Якщо в тексті трапляється слово, що
        # - є в російському словнику, але відсутнє в українському,
        # - написано без помилок,
        # то такі слова перекладаємо українською й пропонуємо як виправлення.
        self.assertSuggests("выговор", "догана")
        self.assertSuggests("премия", "премія")
        self.assertSuggests("наконец", "нарешті")


if __name__ == '__main__':
    unittest.main()
