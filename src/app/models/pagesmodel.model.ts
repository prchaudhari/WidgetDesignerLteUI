import { PageWidgetsDetails } from "./pagewidgetsdetails.model";
import { Widget } from "./widget.model";

export interface PageModel {
  id: number;
  pageName: string;
  description: string;
  dataSourceJson: string;
  pageHtml: string;
  pageCSSUrl: string;
  pagewidgets: PageWidgetsDetails[];
}
