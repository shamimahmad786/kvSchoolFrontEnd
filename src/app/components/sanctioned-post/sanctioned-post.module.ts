import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SanctionedPostRoutingModule } from './sanctioned-post-routing.module';
import { SanctionedPostComponent } from './sanctioned-post.component';
import { QCommonModule } from '../q-common/q-common.module';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    SanctionedPostComponent
  ],
  imports: [
    CommonModule,
    SanctionedPostRoutingModule,
    QCommonModule,
    MatSortModule 
  ]
})
export class SanctionedPostModule { }
