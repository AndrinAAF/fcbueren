import React from 'react';
import ScrollObserver from '@/components/ScrollObserver';
import './portrait.css'; // We will create this file for the timeline CSS

export const metadata = {
  title: 'Vereinsportrait | FC Büren',
};

const timelineData = [
  { year: "8.8.1938", text: "FCB oppositionslos und einstimmig in den seeländischen und schweizerischen Fussballverband als Mitglied aufgenommen" },
  { year: "25.09.1938", text: "Erstes Meisterschaftsspiel in der 4. Liga. Gruppengegner waren Pieterlen, Selzach, Wacker Grenchen, Bettlach, Aegerten, Münster und Fulgor Grenchen" },
  { year: "1945/1946", text: "Aufstieg in die 3. Liga und Wiederabstieg in der Saison 1946/47 unter dem international bekannten Spielertrainer Marc Perroud" },
  { year: "1959", text: "Erstes Grümpelturnier auf der \"Maeschi-Matte\"" },
  { year: "25.8.1963", text: "Einweihung des Sportplatzes beim Schulhausareal" },
  { year: "1963/1964", text: "Aufstiegsspiele gegen Ceneri (1:0 verloren) und Bassecourt (3:3), Aufstieg verpasst" },
  { year: "1964/1965", text: "Aufstieg in die 2. Liga mit Siegen über Bévilard (4:2) und Courrendlin (3:2)" },
  { year: "1968/1969", text: "Abstieg in die 3. Liga nach dreijähriger Zugehörigkeit in der oberen Klasse" },
  { year: "1974", text: "Beginn der Bauarbeiten des Sportplatzes im \"Lättloch\"" },
  { year: "1974/1975", text: "Abstieg in die 4. Liga" },
  { year: "1976", text: "Im September weiht der FCB den neuen Fussballplatz \"Lachen\" ein" },
  { year: "1977/1978", text: "Meldet der FCB drei 4. Liga Equipen zur Meisterschaft an" },
  { year: "1981", text: "Werden CHF 25'000.00 für die Erweiterung des Trainingsplatzes gesprochen" },
  { year: "1982/1983", text: "Aufstieg in die 3. Liga" },
  { year: "1983/1984", text: "Wiederabstieg ein Jahr später" },
  { year: "1984/1985", text: "Jürg Baumann (Pflümli) Aufstieg in die 3. Liga" },
  { year: "1988", text: "Der FC Büren an der Aare feiert sein 50-jähriges Jubiläum" },
  { year: "1989/1990", text: "Für Garderoben/Duschen wird ein Betrag von CHF 395'000.00 gesprochen" },
  { year: "1992", text: "Baupräsident Sepp Eigenmann übergibt dem amtierenden Präsidenten Kurt Schläfli das neue Gebäude \"Garderobe/Dusche\"" },
  { year: "1995", text: "Ueli Hofstetter wird für seine 20-jährige Tätigkeit als Platzwart geehrt" },
  { year: "1999", text: "Die Damen FC Büren an der Aare sind gegründet, nach einem Trainingsjahr wird der Meisterschaftsbetrieb aufgenommen" },
  { year: "2000", text: "An einer ausserordentlichen GV wird die Beschaffung des von Lothar in Mitleidenschaft gezogenen Büropavillons der Bürox für CHF 10'000.00 einstimmig gutgeheissen" },
  { year: "11.01.2002", text: "Die Buvette wird an den FCB übergeben (Bauchef: Sepp Eigenmann)" },
  { year: "2006", text: "Internationales Juniorenturnier (IDEA-Cup) mit Mannschaften von Tirol, Frankfurt, Basel, GC, YB, St. Gallen, Aarau, Luzern, etc." },
  { year: "2006/2007", text: "3. Liga: Aufstieg in die 3. Liga, 1. Stärkeklasse mit Marlon Hodgson (Trainer)" },
  { year: "2007", text: "Der Pflegecontainer wird angeschafft, aufgestellt und bezugsbereit gemacht" },
  { year: "2008", text: "Nach 9 Jahren lösen sich die Frauen des FCB auf. \"Rumble in the Jungle\" wird zum gelungenen Anlass" },
  { year: "2008/2009", text: "3. Liga 1. Stärkeklasse: Aufstieg in die 2. Liga regional mit Marlon Hodgson (Trainer)" },
  { year: "2009", text: "Unmengen von Platten werden auf dem Areal verlegt" },
  { year: "2013", text: "Der FCB feiert sein 75-jähriges Bestehen" },
  { year: "2013/2014", text: "2. Liga reg.: Abstieg in die 3. Liga" },
  { year: "2014", text: "Die Terrasse der Buvette wird überdacht" },
  { year: "2015/2016", text: "Abstieg in die 4. Liga" },
  { year: "2018/2019", text: "4. Liga: Aufstieg 3. Liga mit Patrick Tüscher/Patrick Von Felten (Trainer)" },
  { year: "2019", text: "Im Februar steigt die Heizung aus und muss ersetzt werden" },
  { year: "2019/2020", text: "3. Liga: 3. Platz, wegen Pandemie wird die Saison nach der Vorrunde abgebrochen" },
  { year: "2020/2021", text: "3. Liga: Saison nach 11 Spiele unterbrochen und ab 13.06.21 werden die ausstehenden Spiele der Rückrunde nachgespielt und die Saison nach 11 Spielen gewertet" },
  { year: "2021", text: "Juni/Juli/August Hochwasser, das Hauptfeld wird total saniert. August/September: Neue Beleuchtung auf dem Trainingsfeld wird in Betrieb genommen" },
  { year: "2021/2022", text: "3. Liga: Abstieg in die 4. Liga" },
  { year: "2022/2023", text: "Aufstieg in die 3. Liga mit Slobodan Pranjic" },
  { year: "15.02.2023", text: "Ehrenpräsident René Saisselin stirbt im Alter von 87 Jahren" },
  { year: "2023/2024", text: "3. Liga: 10. Platz mit 18 Punkten aus 22 Spielen, um 2 Punkte nicht abgestiegen" },
  { year: "2024/2025", text: "Patrick Meier übernimmt das Traineramt der 1. Mannschaft. 3. Liga: 12. und letzter Platz, mit 13 Punkten aus 22 Spielen steigt der FCB in die 4. Liga ab" },
  { year: "2025/2026", text: "4. Liga: Trainer Patrick Meier, 2. Platz mit 47 Punkten aus 21 Spielen, punktegleich mit dem Aufsteiger (148 Strafpunkte)" },
  { year: "2026/2027", text: "4. Liga: Trainer Manuel Scheidegger, Assistenztrainer: Carlos Manuel De Sousa Files, Jarno Beyeler" }
];

export default function Vereinsportrait() {
  return (
    <>
      <ScrollObserver />
      <section className="container py-xl" style={{ flex: 1 }}>
        <div className="text-center animate-on-scroll" style={{ marginBottom: '4rem' }}>
          <h1 style={{ color: 'var(--clr-primary)', fontStyle: 'italic', marginBottom: '1.5rem', fontWeight: 900, fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}>Vereinsportrait</h1>
        </div>
        
        <div className="animate-on-scroll portrait-content" style={{ background: 'var(--clr-surface)', padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          
          <div className="contact-info" style={{ marginBottom: '3rem', padding: '2rem', backgroundColor: 'var(--clr-background)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Fussballclub Büren an der Aare</h3>
            <p>Postfach 31</p>
            <p>Kanalstrasse 1, 1a, 1b (Gmde. Dotzigen)</p>
            <p>3294 Büren an der Aare</p>
            <p style={{ marginTop: '1rem' }}><a href="mailto:info@fcbueren.ch" style={{ color: 'var(--clr-primary)', fontWeight: 'bold' }}>info@fcbueren.ch</a></p>
            
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <strong>Gründungsdatum:</strong> 6. Januar 1938<br/>
                <strong>Vereinsnummer:</strong> 10206
              </div>
              <div>
                <strong>Regionalverband:</strong> FVBJ<br/>
                <strong>Kreisverband:</strong> SEFV
              </div>
            </div>
          </div>

          <h2 className="mb-md">Die Gründung</h2>
          <p className="mb-lg">
            Drehen wir die Geschichte um 85 Jahre zurück, wir schreiben den 6. Januar 1938. Ein lang ersehnter Wunsch einiger Fussballverrückter geht endlich in Erfüllung. 19 Fussballer sind nach vielen Vorgesprächen, Abwägungen und Bedenken der Einladung zur Gründungsversammlung gefolgt. Einstimmig wird der Gründung zugestimmt. Die Freude war gross, als die ersten Freundschaftsspiele ausgetragen werden konnten.
          </p>

          <h3 className="mb-sm">Die 19 Gründer</h3>
          <p className="mb-md" style={{ fontStyle: 'italic' }}>
            Walter Baumgartner, Fritz Burgermeister, Fritz Chiffelle, Louis Chiti, Maurice Crevoisier, Walter Jost, Fritz Kocher, Ernst Maeschi, André Mesot, Emil Moning, Hermann Oppliger, Walter Portenier, Emil Reber, Gino Rovera, Fritz Rudolf, Rudolf Rüfenacht, Werner Rüfenacht, Henri Saisselin, Fritz Weyeneth.
          </p>
          <p className="mb-lg">
            <strong>Fritz Kocher</strong> amtiert als Tagespräsident.<br/>
            Da von den 19 Anwesenden altersbedingt eigentlich nur 13-14 als Aktive in Frage kommen, werden Bedenken geäussert, dass dieser Anfangsbestand zu klein sein könnte. Optimistisch hoffen aber die Anwesenden auf baldigen Zuwachs an Aktiven. Die Gründung wird einstimmig beschlossen.
          </p>

          <h3 className="mb-sm">Sofort wird als dann zur Wahl eines Vorstandes geschritten.</h3>
          <p className="mb-lg">Er setzt sich wie folgt zusammen:</p>
          <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '3rem' }}>
            <li><strong>Walter Portenier</strong> - Präsident</li>
            <li><strong>Walter Jost</strong> - Vizepräsident</li>
            <li><strong>Fritz Chiffele</strong> - Sekretär</li>
            <li><strong>Fritz Kocher</strong> - Kassier</li>
            <li><strong>Fritz Weyeneth</strong> - Materialverwalter</li>
            <li><strong>Fritz Rudolf</strong> - Beisitzer</li>
            <li><strong>Emil Moning</strong> - Beisitzer</li>
          </ul>

          <h2 className="mb-md">Immer wieder die Platzfrage</h2>
          <p className="mb-md">
            Die Platzfrage, sie wird in der Geschichte des FCB öfter eine zentrale Rolle spielen, kann an vier verschiedenen Orten in Reiben fast 25 Jahre abgedeckt werden. Dank der Grosszügigkeit einiger Landwirte, sie stellten gegen eine geringe Pacht einen "Grasbitz" zur Verfügung, konnte der geliebte Sport betrieben werden. Aufgrund der Güterzusammenlegung wurde das Land vom letzten Standort Reiben der Baumschule Lehmann zugeteilt. Der Kauf der "Mäschimatte" durch die Gemeinde Büren bot geeigneten Ersatz. In vielen Stunden Eigenleistungen erarbeitete sich der FCB einen schmucken Fussballplatz in Zentrumsnähe. Am 25. August 1963 konnte das erste Meisterschaftsspiel, verbunden mit einer Einweihungsfeier, ausgetragen werden. Während der Bauzeit genoss der FCB Gastrecht in Rüti, Diessbach und Lengnau.
          </p>
          <p className="mb-lg">
            Diese Lösung sollte keine 10 Jahre halten, der Bau einer 3-fach-Turnhalle zwang den FCB erneut auf Platzsuche zu gehen. In der Saison 1971/72 orientierte der Vorstand erstmals über die Variante "Lachen". Die Verhandlungen mit der Gemeinde und der Ziegelei seien auf gutem Wege. Ein Jahr später wird der Finanzierung durch die Gemeinde zugestimmt, und die GV des FCB beschliesst am 24.11.1972 die finanzielle Beteiligung am Sportplatzbau. Im September 1976 konnte endlich der Fussballplatz "Lachen" eingeweiht werden. 1981 Erweiterung des Trainingsplatzes, 1992 Baupräsident Sepp Eigenmann übergibt den Garderobenneubau und am 11.01.2002 die Buvette (Aufbau des Büropavillons der Bürox AG durch Lothar stark beschädigt) dem Verein. In unzähligen Stunden Frondienst konnten weitere Projekte (Überdachung Terrasse Buvette, Pflegecontainer, Ersatz Beleuchtung Trainingsplatz) realisiert werden.
          </p>

          <h2 className="mb-md">Das Sportliche 1960 - 1980</h2>
          <p className="mb-lg">
            Bis zur Saison 1962/63 gastierte der FCB, mit wenigen Ausnahmen, in der 3. Liga. 1963/64 nahm Büren als Gruppensieger erstmals an den Aufstiegsspielen zur 2. Liga teil und scheiterte knapp. Das Spiel gegen den FC Ceneri ging 0:1 verloren, und gegen Bassecourt spielte man unentschieden 3:3. Ein Jahr später gelang das Vorhaben, gegen Bévilard gewann das Team in Büren an der Aare 4:2 und auswärts in Courrendlin brachte der 3:2 Sieg den ersehnten Erfolg. 1967/68, nach 3 Jahren 2. Liga, musste der FCB absteigen. In der Saison 74/75, ein Jahr vor der Einweihung des Fussballplatzes Lachen, stieg das Team gar in die 4. Liga ab. 1977/78, der FCB meldete 3 Viertligamannschaften, steckte der Verein in einem sportlichen Tief, die Durststrecke dauerte bis 1981/82. In der folgenden Saison gelang endlich der Aufstieg. Die Freude währte kurz, in der darauffolgenden Saison fand man sich in der 4. Liga wieder. Wieder eine Saison später realisierte Trainer Jürg "Pflümli" Baumann mit dem Team den erneuten Aufstieg. Wir schreiben das Jahr 1999 die Frauenmannschaft des FCB ist gegründet und steigt nach einem Trainingsjahr in die Meisterschaft ein.
          </p>

          <h2 className="mb-md">Das Sportliche 2000 - 2023</h2>
          <p className="mb-lg">
            Das Fanionteam hält sich in der 3. Liga und feiert mit Trainer Marlon Hodgson den Aufstieg in die 1. Stärkeklasse der 3. Liga (2006/2007). Zwei Saisons später schafft es Büren wieder in die 2. Liga aufzusteigen (2008/2009). Zum Leidwesen aller löste sich das Frauenteam nach 9 Jahren auf. Im Jubiläumsjahr 2013 (75-jähriges Bestehen) dann die Ernüchterung, der Abstieg in die 3. Liga konnte nicht mehr abgewendet werden. In den folgenden Jahren erschuf sich der FCB den Ruf einer Liftmannschaft. Licht und Schatten wechselten sich ständig ab. 2015/16 Abstieg in die 4. Liga (2 Saisons), 2018/19 Aufstieg in die 3. Liga, 2019/2020 Abbruch der Meisterschaft wegen Pandemie, 2020/21 erneuter Unterbruch der Meisterschaft wegen Pandemie und Wertung der Saison nach der Vorrunde. 2021/2022 Abstieg in die 4. Liga und Wiederaufstieg eine Saison später.
          </p>

          <h2 className="mb-md">Das Sportliche heute</h2>
          <p className="mb-lg">
            Die 1. Mannschaft, der Gradmesser für die sportlichen Erfolge des Vereins, ist letzte Saison nach einjährigem Viertliga-Dasein, wieder in die 3. Liga aufgestiegen. Der Start in die Meisterschaft ist dem Team von Trainer Slobodan Pranjic nicht wunschgemäss geglückt. Mit dem zweitletzten Platz und einer Ausbeute von 10 Punkten nach 11 Spielen, ist die Mannschaft unter ihrem Wert klassiert. Verletzungssorgen, Abwesenheiten (u.a. Militär) und fehlendes Wettkampfglück haben eine mögliche Wende zum Besseren vereitelt. Wir sind zuversichtlich und drücken die Daumen.
          </p>

          <h2 className="mb-md">Der Fussballplatz Lachen und das Hochwasser</h2>
          <p className="mb-md">
            An der Orientierung über den Sportplatzbau "Lachen" ergriff René Saisselin das Wort und machte darauf aufmerksam, dass der Platz wegen Hochwassergefahr unbedingt aufgefüllt werden sollte. Diesem Ansinnen war kein Erfolg beschieden. Die wichtigsten Hochwasserereignisse in chronologischer Reihenfolge. 1975/1976 sah sich der FCB erstmals mit dieser Gefahr konfrontiert. Ende August überflutete das Hochwasser zwei Drittel der Fläche. 1998/99 kam es erneut zu Hochwasser, der Meisterschafts- und Trainingsbetrieb musste eingestellt werden. 2007/08 war an Fussball ebenfalls nicht mehr zu denken. Die Vorrunde konnte aber teilweise zu Ende gespielt werden. Ende Juni 2021 will es nicht mehr aufhören zu regnen. Bis in den August hinein war das Hauptfeld und ein Teil des Trainingsplatzes überflutet. Die Trainings mussten auf der "Mäschimatte" und auswärts in Safnern stattfinden. Sämtliche Heimspiele der Vorrunde konnten nach Absprache mit dem Fussballverband und den Gegnern auswärts ausgetragen werden. Eine Totalsanierung durch die Firma Aemmer AG in Lyss ist unerlässlich. Der Chef Infrastruktur und der Platzwart haben unzählige Stunden investiert, damit auf die Rückrunde der Normalbetrieb gestartet werden kann.
          </p>
          <p className="mb-lg">
            Das Hochwasser ist nicht nur eine Frage bezüglich Trainings- und Meisterschaftsbetrieb, sondern auch eine finanzielle Herausforderung, welche den Verein an ihre Grenzen brachte. Die Sanierungskosten wurden ausschliesslich durch den Verein berappt. Da das Hochwasser durch das Grundwasser verursacht wird, ist eine Abwälzung der Kosten auf eine Versicherung nicht gegeben. Dank umsichtiger und verantwortungsvoller Geschäftsführung hat der FCB auch diese Aufgabe mit Bravour bewältigen können.
          </p>

          <h2 className="mb-md">Die Teams heute (Saison 2025/2026)</h2>
          <p className="mb-md">
            Heute zählt der FCB ca. 260 Mitglieder, davon rund 120 Junioren. Die 1. Mannschaft spielt in der 4. Liga und die 2. Mannschaft in der 5. Liga. Eine Mannschaft Ü40 (Veteranen) nehmen ebenfalls an der Meisterschaft teil.
          </p>
          <p className="mb-sm">Im Juniorenbereich sind folgende Teams an der laufenden Meisterschaft beteiligt:</p>
          <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong>B:</strong> Team Häftli, 2. Stkl.</li>
            <li><strong>C:</strong> Team Häftli, Youth League</li>
            <li><strong>C:</strong> Team Häftli, 2. Stkl.</li>
            <li><strong>D/9:</strong> Team Häftli, 2. Stkl.</li>
            <li><strong>D/7:</strong> Team Häftli, 2. Stkl.</li>
            <li><strong>E:</strong> Team Häftli, 2 Teams</li>
            <li><strong>F:</strong> Team Häftli, 2 Teams</li>
            <li><strong>G:</strong> Team Häftli, 2 Teams</li>
          </ul>

          <h2 className="mb-md">Wie finanziert sich der FC Büren an der Aare?</h2>
          <p className="mb-md">
            Der FCB ist weder subventioniert, noch kommt ein Dritter für Kosten z.B. für den Unterhalt der Gebäude, die Platzpflege, Wasser oder Strom, für Anschaffungen (Rasenmäher, sonstige Geräte), Platzsanierungen nach Hochwasser, etc. auf. Der Verein finanziert sich eigenständig, erhält von der Gemeinde einen jährlichen Zuschuss von CHF 20'000.00. Damit sind mit CHF 12'000.00 der Unterhalt der Infrastruktur und mit CHF 8'000.00 die Nebenkosten durch die Gemeinde abgegolten. Bei grösseren Anschaffungen steht die Gemeinde zudem mit zinslosen Darlehen zur Seite.
          </p>
          <p className="mb-lg">
            Bei einem Jahresbudget von ca. CHF 140'000.00 ist der Druck des Beschaffens von Mitteln allgegenwärtig. Obwohl unser Verein nicht auf Rosen gebettet ist, kann der FC auf das Geleistete der letzten 85 Jahre stolz sein.
          </p>
          <p className="mb-lg text-muted" style={{ fontStyle: 'italic' }}>
            November 2023 / Hans Peter Gribi
          </p>

          <hr style={{ margin: '4rem 0', borderColor: 'var(--clr-border)', opacity: 0.3 }} />

          {/* Timeline Section */}
          <div className="timeline-section">
            <h2 className="mb-xl text-center" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: 'var(--clr-primary)' }}>Meilensteine und sportlicher Werdegang</h2>
            
            <div className="timeline">
              {timelineData.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-year">{item.year}</div>
                    <p className="timeline-text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
