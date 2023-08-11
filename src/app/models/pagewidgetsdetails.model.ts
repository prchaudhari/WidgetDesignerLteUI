import { Pages } from "./pages.model";
import { Widget } from "./widget.model";

export interface PageWidgetsDetails {
  id: number;
  pageId: number;
  page: Pages;
  widgetId: number;
  widget: Widget;
  width: number;
  height: number;
  startCol: number;
  startRow: number;
}
