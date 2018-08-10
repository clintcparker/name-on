define("MsPortalImpl.Controls/Controls/Visualization/ChartViewModelConversionHelper",["require","exports","f","o","ko"],(function(n,t,i,r,u){"use strict";function e(n,t,i){i!==undefined&&n.hasOwnProperty(t)&&(u.isObservable(i)?n[t]=i:n[t](i))}function o(n,t){i.forEachKey(t,(function(t,i){e(n,t,i)}))}var f,s,h;r.defineProperty(t,"__esModule",{value:!0});f=i.ViewModels.Controls.Visualization.Chart;s=i.isNullOrUndefined;h=(function(){function n(n,t,i){this.chartViewModel=t;this.simpleChartViewModel=n;this._ltm=i;this._initializeConvertedChartViewModel()}return n.prototype._initializeConvertedChartViewModel=function(){var r=this,n=this.simpleChartViewModel,t;this.chartViewModel.ariaLabel=n.ariaLabel;this.chartViewModel.ariaDesc=n.ariaDesc;this.chartViewModel.autogenerateSeriesViews(!1);this.chartViewModel.xAxis.scale(2);this.chartViewModel.yAxis.showGridLines(!0);this._updateSeries();t=u.unwrap(n.chartType);t=s(t)?0:t;u.isObservable(n.chartType)&&n.chartType.subscribe(this._ltm,(function(n){r._updateChartView(n)}));this._updateChartView(t);n.metricsRules&&(this.chartViewModel.metricsRules=n.metricsRules);i.isUndefined(n.legendPosition)||this.chartViewModel.legendPosition(n.legendPosition);n.xAxis&&o(this.chartViewModel.xAxis,n.xAxis);n.yAxis&&o(this.chartViewModel.yAxis,n.yAxis)},n.prototype._updateSeries=function(){var n=this.simpleChartViewModel.series.map(this._ltm,(function(n,t){var i=new f.Series;return e(i,"name",t.name),e(i,"values",t.values),i}));this.chartViewModel.series=i.thunkArray(this._ltm,n)},n.prototype._updateChartView=function(n){var t=this._getChartView(n);this.chartViewModel.views([t])},n.prototype._getChartView=function(n){var t,r,u;this._convertedChartViewLifetimeManager&&this._convertedChartViewLifetimeManager.dispose();this._convertedChartViewLifetimeManager=this._ltm.createChildLifetime();switch(n){case 3:case 4:case 5:r=n===3?0:n===4?1:2;t=new f.BarChartView(r);break;case 1:t=new f.AreaChartView;break;case 6:t=new f.StackedAreaChartView;break;case 2:t=new f.ScatterChartView;break;case 0:default:t=new f.LineChartView}return u=this.simpleChartViewModel.series.map(this._convertedChartViewLifetimeManager,(function(t,i){var r;switch(n){case 3:case 4:case 5:r=new f.SeriesView;break;case 1:r=new f.AreaChartSeriesView;break;case 6:r=new f.StackedAreaChartSeriesView;break;case 2:r=new f.ScatterChartSeriesView;break;case 0:default:r=new f.LineChartSeriesView}return e(r,"seriesName",i.name),i.viewOptions&&o(r,i.viewOptions),r})),t.seriesView=i.thunkArray(this._convertedChartViewLifetimeManager,u),t},n})();t.ChartViewModelConversionHelper=h}))