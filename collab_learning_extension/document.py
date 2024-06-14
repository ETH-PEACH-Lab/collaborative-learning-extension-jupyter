import json
from functools import partial
from jupyter_ydoc.ybasedoc import YBaseDoc
import y_py as Y
from pycrdt import Map, Array

class YPuzzleDoc(YBaseDoc):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._ydoc["cells"] = self._cells = Map()
        self._ydoc["fields"] = self._fields = Map()

    @property
    def version(self) -> str:
        return '0.1.3'

    def get(self) -> str:
        """
        Returns the content of the document as saved by the contents manager.

        :return: Document's content.
        """
        cells = self._cells.to_py()
        fields = self._fields.to_py()
        return json.dumps(dict(cells= cells, fields= fields), indent=2)

    def set(self, raw_value: str) -> None:
        """
        Sets the content of the document from the contents manager read content.

        :param raw_value: The content of the document.
        """
        value = json.loads(raw_value)

        self._cells["byId"] = Map(value["cells"]["byId"])
        for key in value["cells"]["byId"]:
            self._cells["byId"][key]= Map(value["cells"]["byId"][key])
        self._cells["allIds"] = Array(value["cells"]["allIds"])

        self._fields["byId"] = Map(value["fields"]["byId"])
        for key in value["fields"]["byId"]:
            self._fields['byId'][key]= Map(value["fields"]["byId"][key])
        self._fields["allIds"] = Array(value["fields"]["allIds"])
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
