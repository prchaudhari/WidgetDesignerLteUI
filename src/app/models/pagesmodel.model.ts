import { PageWidgetsDetails } from "./pagewidgetsdetails.model";
import { Widget } from "./widget.model";

export interface PageModel {
  pageName: string;
  description: string;
  dataSourceJson: string;
  pageHtml: string;
  pageCSSUrl: string;
  pageWidth: number;
  pageHeight: number;
  Widgets: PageWidgetsDetails[];
}
