import { Pages } from "./pages.model";
import { Widget } from "./widget.model";

export interface PageWidgetsDetailsModel {
  id: number;
  pageId: number;
  widgetId: number;
  width: number;
  height: number;
  startCol: number;
  startRow: number;
}
