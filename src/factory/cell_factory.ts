import { Cell, CellType } from "../cell_types";


export  abstract class CellFactory {
    public abstract createCell(): Cell

    protected abstract getCellType(): CellType

    public matchCellType(cellType: CellType){
        return cellType === this.getCellType();
    }
}