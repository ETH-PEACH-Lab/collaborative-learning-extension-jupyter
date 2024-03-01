import json
from functools import partial
from jupyter_ydoc.ybasedoc import YBaseDoc
import y_py as Y

class YPuzzleDoc(YBaseDoc):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._cells = self._ydoc.get_array('cells')

    @property
    def version(self) -> str:
        return '0.1.0'

    def get(self) -> str:
        """
        Returns the content of the document as saved by the contents manager.

        :return: Document's content.
        """
        cells = json.loads(self._cells.to_json())
        return json.dumps({"cells":cells},
                indent=2,
            )

    def set(self, raw_value: str) -> None:
        """
        Sets the content of the document from the contents manager read content.

        :param raw_value: The content of the document.
        """
        value = json.loads(raw_value)
        with self._ydoc.begin_transaction() as t:
            newObj = []
            for obj in value["cells"]:
                newObj.append(Y.YMap(obj))
            self._cells.delete_range(t,0,len(self._cells))
            self._cells.extend(t,newObj)
    #

    def observe(self, callback: "Callable[[str, Any], None]") -> None:
        """
        Subscribes to document changes.

        :param callback: Callback that will be called when the document changes.
        """
        self.unobserve()

        self._subscriptions[self._ystate] = self._ystate.observe(partial(callback, "state"))
        self._subscriptions[self._cells] = self._cells.observe_deep(partial(callback, "cells"))
    #