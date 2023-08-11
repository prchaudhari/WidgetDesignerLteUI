import { Widget } from "./widget.model";

export interface Pages {
  id: number;
  pageName: string;
  description: string;
  dataSourceJson: string;
  pageHtml: string;
  pageCSSUrl: string;
  widgets: Widget[];
}
