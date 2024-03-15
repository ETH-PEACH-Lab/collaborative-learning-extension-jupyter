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
        for cell in cells:
            solutions = {}
            for key, value in cell["solutions"].items():
                solutions[key] = YPuzzleSolutionDoc(content=value)  # Share the subdocument
            cell["solutions"] = solutions
        return json.dumps({"cells": cells}, indent=2)

    def set(self, raw_value: str) -> None:
        """
        Sets the content of the document from the contents manager read content.

        :param raw_value: The content of the document.
        """
        value = json.loads(raw_value)
        with self._ydoc.begin_transaction() as t:
            newObj = []
            for cell in value["cells"]:
                new_solutions = {}
                for key, solution in cell["solutions"].items():
                    new_solutions[key] = solution.toJSON()  # Convert subdoc to JSON string
                cell['solutions']=new_solutions;
                newObj.append(Y.YMap(cell))
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
class YPuzzleSolutionDoc(YBaseDoc):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._content = self._ydoc.get_map('content')

    @property
    def version(self) -> str:
        return '0.1.0'

    def get(self) -> str:
        """
        Returns the content of the document as saved by the contents manager.

        :return: Document's content.
        """
        data = json.loads(self._content.to_json())
        return json.dumps(data,
            indent=2
        )

    def set(self, raw_value: str) -> None:
        """
        Sets the content of the document from the contents manager read content.

        :param raw_value: The content of the document.
        """
        value = json.loads(raw_value)
        with self._ydoc.begin_transaction() as t:
            # clear document
            for key in self._content:
                self._content.pop(t, key)
            for key in [k for k in self._ystate if k not in ("dirty", "path")]:
                self._ystate.pop(t, key)
            for key in value:
                self._content.set(t, key, value[key])
    #

    def observe(self, callback: "Callable[[str, Any], None]") -> None:
        """
        Subscribes to document changes.

        :param callback: Callback that will be called when the document changes.
        """
        self.unobserve()
        self._subscriptions[self._ystate] = self._ystate.observe(partial(callback, "state"))
        self._subscriptions[self._content] = self._content.observe(partial(callback, "content"))
    #