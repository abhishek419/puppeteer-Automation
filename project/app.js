const puppeteer = require('puppeteer');
(async ()=>{
 let browser = await puppeteer.launch({
    headless: false,
     slowMo: 50,
    defaultViewport:null,
    args: ["--start-maximized"],
  })
  
  let pages= await browser.pages();
  let page = pages[0];
  //let tab = pages[1];
  await page.evaluateOnNewDocument(()=>{
      window.open = (url)=>{
          top.location=url;
      }
  })
  await page.goto("https://www.goibibo.com/");
  let lists = await page.$$(".mainLinks li");
  await Promise.all([lists[1].click(),page.waitForNavigation({waitUntil: "networkidle2"})])
  await page.waitForSelector(".HomePageAutosuggeststyles__SearchInputStyles-sc-1v6s32j-1.fqYzvY")
  await page.type(".HomePageAutosuggeststyles__SearchInputStyles-sc-1v6s32j-1.fqYzvY","Delhi");
  await page.waitForSelector("#downshift-1-menu li")
  await page.click("#downshift-1-item-0")
  await page.waitForSelector(".SearchBlockUIstyles__SearchButtonAutoSuggest-fity7j-12.kGmYkx");
  await Promise.all([page.click(".SearchBlockUIstyles__SearchButtonAutoSuggest-fity7j-12.kGmYkx"),page.waitForNavigation()])
  await page.waitForSelector(".Tabs__TabsListWrapper-sc-128baoh-1.SAVGO")
  let priorityTypeList = await page.$$(".Tabs__TabsListWrapper-sc-128baoh-1.SAVGO li")
  await priorityTypeList[4].click();
  await page.waitForSelector(".CheckBoxList__CheckboxListWrapperDiv-sc-5k7440-0.iVbvPd ")
  for(let i=1 ; i<=4;i++){
     await page.click(".CheckBoxUncheckedIcon-sc-13ilmpa-0.fsJRQJ")
  }
  await page.type("#downshift-3-input","Aerocity");
  await page.waitFor(2000);
  await page.click(".CheckBoxUncheckedIcon-sc-13ilmpa-0.fsJRQJ");
  await page.waitForSelector(".Sortingstyles__WrapperSpan-sc-6jp48d-13.loWiYx")
  await page.hover(".Sortingstyles__WrapperSpan-sc-6jp48d-13.loWiYx")
  await page.waitForSelector(".Sortingstyles__HiddenDropdownWrapperDiv-sc-6jp48d-0.eRKbhg",{visible: true})
  let sortByList = await page.$$(".Sortingstyles__ListDropDownWrapper-sc-6jp48d-5.iFqJNi li"); 
  await sortByList[2].click();
  let Purl = await page.url();
  await page.waitForSelector(".HotelCardstyles__WrapperSectionMetaDiv-sc-1s80tyk-2.icOnHb");
  await page.waitFor(2000);

  await Promise.all([page.click(".HotelCardstyles__WrapperSectionMetaDiv-sc-1s80tyk-2.icOnHb"),page.waitForNavigation()]);

  await page.waitForSelector(".RoomFlavor__ButtonWrapper-guj4pt-18.hkfpOz");
  await page.click(".RoomFlavor__ButtonWrapper-guj4pt-18.hkfpOz");
  await page.type(".PersonalProfile__NameEnterInput-sc-1r9ak8b-8.eexYUW",'Abhishek');
  await page.type("input[data-testid=last-name]",'kumar')
  await page.type(".PersonalProfile__MobileEnterInput-sc-1r9ak8b-12.jFIHUq","hk576470@gmail.com");
  await page.type(".PersonalProfile__MobileNoWrapper-sc-1r9ak8b-14.bnNomr","8178183266");
  await page.screenshot({path:'bookingPage.jpg',type: 'jpeg',fullPage: true});
  await page.waitForSelector(".GuestDetailBlock__CustomButton-sc-6dnm3n-12.gNgLfI");
  await page.click(".GuestDetailBlock__CustomButton-sc-6dnm3n-12.gNgLfI");
  await page.screenshot({path:'paymentGate.jpg',type: 'jpeg',fullPage: true});  
  await browser.close();
})()