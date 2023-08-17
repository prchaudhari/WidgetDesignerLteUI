export interface Widget {
  id: number;
  widgetName: string;
  description: string;
  dataSourceJson: string;
  widgetHtml: string;
  widgetCSS: string;
  widgetCSSUrl: string;
  widgetIconUrl: string;
  width: number;
  height: number;
  dataBindingJsonNode: string;
  fontName: string;
  startCol: number;
  startRow: number;
}
