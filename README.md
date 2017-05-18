 ionic serve -p $PORT --nolivereload
 
ionic package build android --profile breakfast --release
 
 search bar :https://github.com/djett41/ionic-filter-bar#demo
 
 Bugs:
 - In case the location is disabled in the phone, the app is stuck on empty window;
 - There is no notification on iframe loading, gives the feeling of stuck app in the process of purchasing copun;
 - There is groupon mobile window that promote to download their app, how do we skip it?
 - the splash screen is removed and the screen below is blank
 
Additional work: 
- Performance improvments (.e.g. 
   - keeping most on the copun on browser storage for quick reopen;
   - Minimizing resources and javascript?
   - keeping a different list for the visible copun (30 in the nearest location) and the rest should be kept only for search.)
- working with private source control -> bit bucket;
- Enable upgrading with ionic deploy mechanism (skip the app store update);
- Server side + database for the copuns;
- More sources for the copuns,
  - Big Deal;
  - Baligam;
  - Cal + Isracard + leumi Card?
  - אתר חביתה?
- App design improvments.