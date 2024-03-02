export type CellType = 'markdown' | 'code' | 'single_choice';
export type Metadata = any;
export type CellBase = {
    id: string;
    cell_type: CellType;
    metadata: Metadata;
};
export type Language = 'TypeScript' | 'JavaScript' | 'Python' | 'Markdown'
export interface ICodeCell extends CellBase {
    cell_type: 'code';
    code: string;
    language: Language;
}
export interface IMarkdownCell extends CellBase {
    cell_type: 'markdown';
    markdown: string;
}
export type Cell = ICodeCell | IMarkdownCell;