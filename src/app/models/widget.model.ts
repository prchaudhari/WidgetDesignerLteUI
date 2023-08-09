export interface Widget {
  id: number;
  widgetName: string;
  description: string;
  dataSourceJson: string;
  WidgetHtml: string;
  widgetCSS: string;
  widgetCSSUrl: string;
  WidgetIconUrl: string;
  width: number;
  height: number;
  dataBindingJsonNode: string;
  fontName: string;
  startCol: number;
  startRow: number;
}
