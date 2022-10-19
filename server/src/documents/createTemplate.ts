import { FetchedOrderForPrint } from "../types";
let _ = require("lodash");
import { logoBase64 } from "./images/logoBase64";
import { mail } from "./images/mail";
import { phone } from "./images/phone";
import { location } from "./images/location";
import { globe } from "./images/globe";

export const getHtmlTemplate = (orderDetails: FetchedOrderForPrint, checked:boolean) => {
  const {
    order_number,
    order_date,
    haulier_instructions,
    haulier_vat_number,
    haulier_name,
    haulier_country,
    haulier_address1,
    haulier_address2,
    haulier_zip,
    haulier_city,
    price,
    currency,
  } = orderDetails;

  const loads = orderDetails.loads;


  const terms = `<div class="container_terms style="page-break-after:always;">
  <h1 class="terms">TERMS & CONDITIONS</h1>
  </br> </br>
  <h4>Fakturační instrukce:

  Fakturační adresa:</br>
  MAURICE WARD & Co., s. r. o., CTPark Prague Airport, CTPark Nad kovárnou 185, 252 68 Kněževes,IČO: 62908227, DIČ:CZ62908227 </br> </br>
  
  Zasílací adresa:
  MAURICE WARD & Co., s. r. o., CTPark Prague Airport, Nad kovárnou 185, Kněževes, 252 68 Středokluky, Czech Republic </br> </br>
  
  Na fakturu uvádějte číslo přepravní smlouvy. </br> </br>
  
  Fakturu a originály potvrzených nákladových listů CMR , alternativních důkazů ex, T1 pokud jsou připojeny, dodacích listů a cargo manifestů (dále podkladů) zašlete do 5ti dnů po odjetí přepravy.</br>
  
  Nascanované podklady zašlete ihned po odjetí přepravy formou emailu na adresu: miroslav.zelienka@mauriceward.com. </br> </br>
  
  V případě nedodržení fakturačních instrukcí muže být toto bráno jako nedodržení přepravních podmínek ve smyslu odstavce 4 přepravních podmínek, při čemž se prodlužuje doba splatnosti na 60 dní ode dne doručení faktury včetně potvrzených podkladů.</br> </br> </br>
  
  Podmínky přepravy: </br> </br> </br>
  
  &bull; Dopravce musí mít platné pojištění odpovědnosti dopravce pro daný druh přepravy, které kryje plně jeho odpovědnost, minimálně však do částky 4 mil. Kč, včetně pohřešování zásilky či její části.</br>
  &bull; Bez písemného souhlasu zadavatele nesmí být k nákladu nic doloženo nebo zboží přeloženo na jiné vozidlo a ani dopravce nesmí použít k provedení přepravy jiného dopravce bez písemného souhlasu zadavatele.</br>
  &bull; V případě jakýchkoliv problémů a nejasností během přepravy, včetně zdržení je dopravce povinen neprodleně informovat objednavatele. Dopravce je povinen informovat zadavatele o jakémkoliv rozporu v průběhu přepravy s touto objednávkou zadavatele a průběžně informovat zadavatele o průběhu přepravy (přesný termín nakládky, zaclení, vyclení, vykládky apod). </br> </br>
  
  Ostatní podmínky přepravy :</br> </br> </br>
  
 &bull; Zadavatel vyžaduje prioritně písemné sjednání této přepravní smlouvy a pokud dopravce objednávku písemně nepotvrdí, ale přistaví vozidlo k nakládce a zadavatel ho naloží, pak je obsah této smlouvy konkludentně potvrzen oběma stranami, včetně ujednání o alternativní ceně za přepravu, dle bodu č.9 této smlouvy. </br> </br>
 &bull; Doba splatnosti faktury za přepravu je 60 dní ode dne obdržení 2ks potvrzených originálů nákl. listů nebo dodacích listů a řádné faktury dopravce. Všechny doklady musí být náležitě potvrzeny a orazítkovány běžným způsobem. Dopravce je povinen doručit objednateli fakturu spolu s požadovanými doklady do 7 dnů po ukončení přepravy. Dopravce je povinen bez zbytečného odkladu po provedení přepravy zaslat elektronicky objednateli kopie přepravních listin na email : ad.plzen@mauriceward.com. </br> </br>
 &bull; Prostoje za které nese odpovědnost objednatel budou propláceny pouze paušální částkou 300,- Kč /den a to pouze v případě, že budou náležitě doloženy potvrzením o prostojích a důvodech prostojů, zároveň musí objednatel být o prostoji neprodleně informován písemně, nejpozději do 24 hodin od jejich vzniku. Prostoje na nakládce nebo vykládce v rozsahu nepřekračující v jednotlivém případě 24 hodin jsou zohledněny již v ceně přepravy. </br> </br>
 &bull; Dopravce má povinnost být účasten nakládky a vykládky, zkontrolovat počet kusů a označení zásilky, zjevný stav zásilky, obalu zásilky a způsob uložení zásilky na vozidle. V případě, že nebude moci dopravce toto provést, tak si vyžádá pokyny od zadavatele.
 &bull; Dopravce je povinen vykonat přepravu s řádnou odbornou péčí tak, aby zásilka byla vystavována co nejmenším rizikům při přepravě, zvláště volit pečlivě způsob přepravy, trasu přepravy a místa pro odstavení vozidla a dle jejího charakteru zásilky zabezpečit ochranu zásilky při odstavení vozidla. Dopravce musí vždy zásilku považovat za velmi cennou, pokud není výslovně zadavatelem uvedeno jinak.Náklady na bezpečnostní opatření zásilky nese Dopravce.
 &bull; Dopravce je povinen mít k dispozici u nakládky potřebné zajišťovací materiály na upevnění nákladu, podle uváděného druhu nákladu. Případně je povinen na vlastní náklady si u nakládky zajistit tento materiál, aby byla zásilka zajištěna v souladu s bezpečnostními předpisy. Dopravce je povinen řádně provést veškerá správní řízení prováděná při vykonávání přepravy. Pokud zadavatel uzavře přepravní smlouvu s dopravcem a vznikne nějaká škoda z důvodu chybného provedení správního řízení slibuje dopravce, že nahradí takovéto škody zadavateli. </br> </br>
 &bull; Uvedená cena za přepravu je smluvní cena, v které jsou zahrnuty veškeré poplatky související s přepravou
  
  zásilky. Dopravce má nárok na zaplacení výše uvedené smluvní ceny za přepravu výhradně za předpokladu, že dodrží všechny zde stanovené podmínky a termíny přepravy, jinak se sjednává alternativní výše přepravného, a to ve výši jedné poloviny původní smluvní ceny za přepravu uvedené na 3 straně. Tato dohoda o ceně nebude použita v případě, že dopravce prokáže, že došlo k nesplnění smlouvy v důsledku okolností, které nemohl odvrátit, a které nevyvolal vlastní nedbalostí.
  Dopravce je povinen uhradit zadavateli smluvní pokutu ve výši sjednané ceny přepravy, za každé jednotlivé porušení následujících povinností dopravce: nedodrží dohodnutý termín nakládky, neprovede řádnou kontrolu stavu, či obalu nebo uložení zásilky při jejím převzetí od odesílatele, neinformuje zadavatele o rozporech přepravního dokladu s touto objednávku, nedodrží termín vykládky. Pokud si dopravce nevyžádá písemný souhlas zadavatele s použitím dalšího subdodavatele na splnění této objednávky, je povinen uhradit zadavateli smluvní pokuta ve výši …10.. násobku ceny přepravy. Stejnou smluvní pokutu uhradí dopravce zadavateli, pokut využije informací a údajů z této přepravní smlouvy pro získání jiných přepravních smluv od osob, které se podíleli na této přepravě, vyjma zadavatele.
  </br> </br>
  &bull; Strany si sjednaly, že promlčecí lhůta pro uplatnění nároků na náhradu škody na zásilce nebo z důvodu překročení dodací lhůty činí 4 roky od splatnosti faktury zadavatele na náhradu takovéto škody. Zápis o škodě učiněný příjemcem zásilky je považován, za uplatnění práva na náhradu škody, jak příjemcem, tak zadavatelem.
  </br> </br>
  &bull; Kontakt se zákazníkem nad rámec povinností vyplývajících z této přepravy bude posuzován jako konkurenční jednání a to i jeden rok po ukončení přepravy. Zákazníkem se rozumí jakýkoliv subjekt práva, jehož identita byla dopravci sdělena při sjednávání nebo plnění přepravní smlouvy popřípadě byla uvedena v dokladech daných dopravci k dispozici
  </br> </br>
  &bull; Smluvní poměry mezi stranami se řídí Občanským zákoníkem (zákon č. 89/2012 Sb.), a dalšími právními předpisy platnými v ČR nebo v EU. Tento návrh přepravní smlouvy nahrazuje veškerá předchozí jednání o smlouvě o přepravě věci a obsahuje úplné znění přepravní smlouvy ve smyslu § 1740 odst. 3 a § 2155 občanského zákoníku, a lze ho akceptovat pouze v této podobě. Jakékoliv návrh na změnu znění smlouvy vyžadují ze strany objednatele nový návrh smlouvy.
  </br> </br>
  &bull; Pokud nastane při přepravě škoda, jejíž riziko vzniku nebylo pojištěno odpovědnostním pojištěním dopravcem, tak se sjednává právo zadavatele použít pohledávky dopravce vůči zadavateli na jistotu k zajištění úhrady práva na náhradu škody. Dopravce je povinen prokázat zadavateli, že vzniklá škoda bude kryta z pojištění odpovědnosti dopravce.
  </br> </br>
  &bull; Dopravce není oprávněn postoupit pohledávku na přepravné za zadavatelem třetí osobě bez předchozího písemného souhlasu zadavatele.
  </br></br>
  &bull; Pokud zadavateli předá zásilku dopravci a vznikne v průběhu přepravy škoda, slibuje dopravce odškodnit zadavatele v plné míře, včetně nákladů na vymáhání škody po dopravci.
  </br> </br>
  &bull; Strany se dohodly, že pro tento smluvní vztah neplatí § 2050 zákona č. 89/2012 Sb. a zadavatel má právo na náhradu škody i na zaplacení smluvních pokut. Výše jednotlivých smluvních pokut vyjadřuje právní zájem zadavatele na řádném plnění této smlouvy, a obě strany jsou s výší vyjádřeného zájmu srozuměny a akceptují danou výši jako přiměřenou. Smluvní pokuta je splatná do 7 dní od odeslání výzvy zadavatele. Náhradová povinnost objednatele za škody vzniklé dopravci je omezena desetinásobkem ceny přepravy. Cenou přepravy pro účely této smlouvy se rozumí sjednaná základní cena přepravného včetně DPH. Všechny sliby dopravce jsou činěny za předpokladu, že objednatel sjedná s dopravcem tuto smlouvu o přepravě věci. Dopravce není povinen hradit smluvní pokuty sjednané touto přepravní smlouvou, pokud porušení jeho povinnosti bylo způsobeno vyšší mocí.
  </br> </br>
  &bull; Uvedená smlouva je fixní a toto její konečné znění lze změnit pouze písemnou dohodou postupně číslovanými dodatky. Smluvní strany prohlašují, že tato smlouva i jednotlivé smlouvy o přepravě věci jsou sjednávány na základě vzájemného jednání smluvních stran, a proto nelze tyto smlouvy považovat ve smyslu občanského zákoníku za smlouvy adhezní.
  </br> </br>
  Pokud dojde nějaká část této objednávky nečitelná, okamžitě nás informujte!
  </br> </br>
  Důležité: Pakliže nebudou k faktuře přiloženy 2ks orig., řádně potvrzených dokladů o doručení zásilky a nebo nebude na faktuře uvedena naše pozice, nebo uvedena nesprávná doba splatnosti, bude se na fakturu hledět jako by nebyla doposud doručena.
  </br> </br>
  
  Razítko , podpis zadavatele	Razítko , podpis dopravce
  <h4>
</div>`
 
  

  return `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Invoice Template</title>
            <style>
            *{
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
           .terms{
             text-align:center;
             color:#409593;
             line-height:15px;
             font-size:20px;
           }

           .margin{
             margin-top:10px;
           }

           .container_terms{
             margin-top:100px;
             max-width: 1170px;
             width: 100%;
             margin: 0 auto;
             padding: 10px;
           }

           h4{
             font-size:14px;
             color:#1f458d;
             line-height: 1.3;
           }
            .wrapper {
              width: 100%;
              height: 100%;
              margin: 0 auto;
              
            }

            .mg{
              margin-right:6px;
              font-size:14px;
            }
      
            .header {
              display:flex;
              justify-content:space-between;
              align-items:center;
              width: 100%;
              padding:7px;
              height: 130px;
              background: rgb(78, 138, 156);
              background: linear-gradient(
                90deg,
                rgba(78, 138, 156, 1) 0%,
                rgba(55, 156, 141, 1) 50%,
                rgba(44, 166, 135, 1) 100%
              );
              
            }
      
            #pentagon {
              width: 190px;
              height: 160px;
              margin-left: 50px;
            }
            #pentagon img {
              width: 100%;
              height: 100%;
              margin: 0 auto;
            }

             .footer {
              width: 100%;
              height: 65px;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              position:fixed:
              bottom:0;
              background: rgb(78, 138, 156);
              background: linear-gradient(
                90deg,
                rgba(78, 138, 156, 1) 0%,
                rgba(55, 156, 141, 1) 50%,
                rgba(44, 166, 135, 1) 100%
              );
            }
      
            .container{
              max-width: 1170px;
              width: 100%;
              margin: 0 auto;
              padding: 10px;
             
            }
      
            .flex{
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              
            }
            h1{
              font-size:15px;
              margin:10px 0px;
            }
            .flex p{
              margin: 3px 0px;
              font-size:13px;
            }
            .main{
              margin:5px 0px;
              
            }
            .signature {
              width: 100%;
              height: 30px;
              display:flex;
              align-items: flex-end;
            }
            .signaturespan{
              color:#1f458d;
              width: 330px;
              height: 2px;
              background-color: black;
              margin-left: 100px;
            }

            .price{
              font-size:22px;
              color:#409593;
              text-align:center;
              margin_bottom:5px;

            }
      
            .site{
              color: white;
              font-size:20px;
              margin-right: 70px;
            }

            .footer_div{
              display:flex;
              justify-content:space-between;
              align-items:center;
              width:230px;
            }
            .footer_div img{
              widht:27px;
              height:27px;
              margin-right:8px;
            }

            .icons{
              width:100%;
              height:100%;
              display:flex;
              align-items:center;
              justify-content:center;
            }

            .icon{
              width:100$;
              display:flex;
              flex-direction:column;
              align-items:center;
              justify-content:space-between;
              margin:0px 15px;
             
            }

            .h1{
              color:#409593;
              font-size:13px;
            }

            .h11{
              color:#409593;
              font-size:15px;
              text-align:center;
            }

           p{
              color:#1f458d;
              font-size:11px;
              margin:3px 0px;
              
            }
            .icon img{
              width:25px;
              height:25px;
            }
            .icon p{
              font-size:12px;
            }
            
            .icon2{
              margin-top:14px;
             
            }

            
            .loaddetails{
              width:100%;
              margin-top:10px;
            }
           

            .company{
              width:50%;
            }

            .pcs{
              width:50%;
              display:flex;
              justify-content:space-between;
              align-items:center;
              margin:0 auto;
              white-space:nowrap;

            }

            .deliverydiv{
              width:50%;
              
              
            }
            .shadow{
              box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
              width:100%;
              padding:15px;
            }
            .infodiv{
             padding:10px;
             width:100%;
             display:flex;
             flex-wrap:wrap;
             justify-content:center:
             border:1px solid red;
             box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
              
            }

            .loc{
              margin-left:60px;
              margin-top:5px;
            }
            .num{
              margin-top:5px;
            }

            .h1a{
              
            }

            .icon1{
              margin-bottom:18px;
            }
            </style>
          </head>
          <body>
            <div class="wrapper" style="page-break-after:always;">
              <header class="header">
                <div id="pentagon">
                <img src="${logoBase64}"/>
                </div>
                <div class="icons">
                      <div class="icon icon1">
                        <img src="${phone}"/>
                        <p class="num">+420 233097793</p>
                      </div>
                      <div class="icon icon3 ">
                        <img src="${mail}"/>
                        <p>prague@mauriceward.com</p>
                        <p>www.mauriceward.com</p>
                      </div>
                      <div class="icon icon2">
                        <img src="${location}"/>
                        <p class="loc">Maurice Ward & Co, s.r.o. <br/>
                        CTPark Prague Airport, Na Staré silnici 185, <br/> 252 68 Kněževes, Czech Republic
                        </p>
                      </div>

                </div>
               
              </header>
              <main class="main">
               <div class="container">
                 <div class="flex">
                   <h1 class="h1 h11">Transport order</h1>
                   <div class="shadow"> <p class="title">Ref. ${loads.map((item) => {
                    return `${item.job_number}`;
                  })}</p>
                   
                  <p class="title">Date:  ${order_date.toLocaleDateString(
                    "en-GB"
                  )}</p>
                  <p class="title">Vendor: ${loads.map((item) => {
                    return `${haulier_name}`;
                  })} <br/> Address: ${haulier_address1} ${haulier_address2} ${haulier_zip} ${haulier_city} <br/> VAT Number: ${haulier_vat_number} <br/> Instuctions: ${haulier_instructions}</p></div>
                  
                    
                     <div class="loaddetails">
                          ${loads.map((item) => {
                            const job_number = item.job_number;
                            const {
                              company: pickupCompany,
                              date: pickupDate,
                              time_from: pickupTimeFrom,
                              time_to: pickupTimeTo,
                              adress1: pickupAdress1,
                              adress2: pickupAdress2,
                              city: pickupCity,
                              zip: pickupZip,
                              instructions: pickupInstructions,
                            } = item.load_details.pickupDetails;

                            const {
                              company: DeliveryCompany,
                              date: DeliveryDate,
                              time_from: DeliveryTimeFrom,
                              time_to: DeliveryTimeTo,
                              adress1: DeliveryAdress1,
                              adress2: DeliveryAdress2,
                              city: DeliveryCity,
                              zip: DeliveryZip,
                              instructions: DeliveryInstructions,
                            } = item.load_details.deliveryDetails;

                            const { pcs, gross_weight, volume } =
                              item.load_details.loadDetails;
                            const datee = new Date(pickupDate);
                            const dateee = new Date(DeliveryDate);

                            return ` 
                            <h1 class="h1 h1a">Job Number : ${job_number}</h1>
                                      <div class="infodiv">
                                  
                                           <div class="company">
                                      
                                           <h1 class="h1"> &bull; Place of Loading: ${pickupCompany} </h1>
                                          
                                              <p>Date: ${datee.toLocaleDateString(
                                                "en-GB"
                                              )}</p>
                                              <p>Time From: ${pickupTimeFrom} Time To: ${pickupTimeTo}</p>
                                              <p>Address: ${pickupAdress1} ${pickupAdress2} ${pickupZip} ${pickupCity}</p>
                                              <p>Instructions:${pickupInstructions}</p>

                                             </div>
                                       
                                          <div class="deliverydiv">
                                          <h1 class="h1"> &bull; Place of Delivery: ${DeliveryCompany}</h1>                                       
                                          <p>Date: ${dateee.toLocaleDateString(
                                            "en-GB"
                                          )}</p>
                                          <p>Time From: ${DeliveryTimeFrom} Time To: ${DeliveryTimeTo}</p>
                                          <p>Address: ${DeliveryAdress1} ${DeliveryAdress2} ${DeliveryZip} ${DeliveryCity}</p>
                                          <p>Instructions:${DeliveryInstructions}</p>
                                         </div>
                                        
                                          <div class="pcs">
                                          <h1 class="h1"> &bull; Cargo Details</h1>
                                            <p class="mg">PCS:${pcs}</p>
                                            <p class="mg">Gross Weight:${gross_weight}</p>
                                            <p class="mg">Volume:${volume}</p>
                                          </div>
                                     </div>`;
                          })}
                     </div>
                   </div>
                   <h1 class="h1 h11">Agreed price for transport: ${price} ${currency}<h1/>
                    <p>Transport order Issued by: </p>
                    <p>Tel. contact:</p>
                    <p>Date: ${order_date.toLocaleDateString(
                      "en-GB")}  </p>
                    <p>Billing details<p>
                  
               </div>
                    <div class="footer">
                    <div class="footer_div">
                    <img src="${globe}"/>
                    <p class="site">www.mauriceward.com</p>
                    </div>
                    
                   
              </div>
              
                ${checked? terms : ""}
                
                </div>
                
                
              
              </main>
             
                
                   
            </div>
          </body>
        </html>`;
};
