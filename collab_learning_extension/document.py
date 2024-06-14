import json
from functools import partial
from jupyter_ydoc.ybasedoc import YBaseDoc
import y_py as Y

class YPuzzleDoc(YBaseDoc):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._cells = self._ydoc.get_map('cells')
        self._fields = self._ydoc.get_map('fields')

    @property
    def version(self) -> str:
        return '0.1.1'

    def get(self) -> str:
        """
        Returns the content of the document as saved by the contents manager.

        :return: Document's content.
        """
        cells = json.loads(self._cells.to_json())
        fields = json.loads(self._fields.to_json())
        return json.dumps({"cells": cells, "fields": fields}, indent=2)

    def set(self, raw_value: str) -> None:
        """
        Sets the content of the document from the contents manager read content.

        :param raw_value: The content of the document.
        """
        value = json.loads(raw_value)
        print(value)
        with self._ydoc.begin_transaction() as t:
            for key in [k for k in self._ystate if k not in ("dirty", "path")]:
                self._ystate.pop(t, key)

            self._cells.set(t,"byId", Y.YMap(value["cells"]["byId"]))
            for key in value["cells"]["byId"]:
                self._cells.get('byId').set(t,key, Y.YMap(value["cells"]["byId"][key]))
            self._cells.set(t,"allIds", Y.YArray(value["cells"]["allIds"]))

            self._fields.set(t,"byId", Y.YMap(value["fields"]["byId"]))
            for key in value["fields"]["byId"]:
                self._fields.get('byId').set(t,key, Y.YMap(value["fields"]["byId"][key]))
            self._fields.set(t,"allIds", Y.YArray(value["fields"]["allIds"]))
    #

    def observe(self, callback: "Callable[[str, Any], None]") -> None:
        """
        Subscribes to document changes.

        :param callback: Callback that will be called when the document changes.
        """
        self.unobserve()

        self._subscriptions[self._ystate] = self._ystate.observe(partial(callback, "state"))
        self._subscriptions[self._cells] = self._cells.observe_deep(partial(callback, "cells"))
        self._subscriptions[self._fields] = self._fields.observe_deep(partial(callback, "fields"))
    #
