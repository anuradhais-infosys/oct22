import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './JQueryWpWebPart.module.scss';
import * as strings from 'JQueryWpWebPartStrings';

import MyAccordionTemplate from './MyAccordionTemplate';
import * as jQuery from 'jquery';
import 'jqueryui';
import { SPComponentLoader } from '@microsoft/sp-loader';

require('../../../node_modules/jqueryui/jquery-ui.css');

export interface IJQueryWpWebPartProps {
  description: string;
}


export default class JQueryWpWebPart extends BaseClientSideWebPart<IJQueryWpWebPartProps> {

  // protected onInit(): Promise<void> {
  //    SPComponentLoader.loadCss('code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
  //   return super.onInit();
  // }
//
// ./node_modules/jqueryui/jquery-ui.css 


public constructor() {
      super();
      SPComponentLoader.loadCss('//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
    }
  
  public render(): void {
     this.domElement.innerHTML = MyAccordionTemplate.templateHtml;
    const accordionOptions: JQueryUI.AccordionOptions = {
      animate: true,
      collapsible: false,
      icons: {
        header: 'ui-icon-circle-arrow-e',
        activeHeader: 'ui-icon-circle-arrow-s'
      }
    };
  
    jQuery('.accordion', this.domElement).accordion(accordionOptions);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
