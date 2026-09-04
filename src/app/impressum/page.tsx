"use client";

import React from 'react';

export default function Impressum() {
  return (
    <section className="container py-xl" style={{ flex: 1 }}>
      <div className="text-center mb-lg">
        <h1>Impressum</h1>
        <p>Rechtliche Informationen</p>
      </div>

      <div style={{ background: 'var(--clr-surface)', padding: '3rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>

        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          <strong>FC Büren an der Aare</strong><br />
          Kanalstrasse 1, 1a, 1b (Gmde. Dotzigen)<br />
          3294 Büren an der Aare<br />
          <a href="mailto:info@fcbueren.ch" style={{ color: 'var(--clr-primary)' }}>info@fcbueren.ch</a>
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>Copyright</h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Das Copyright für sämtliche Inhalte dieser Website liegt beim FC Büren an der Aare.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>Disclaimer</h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Alle Texte und Links wurden sorgfältig geprüft und werden laufend aktualisiert. Wir sind bemüht, richtige und vollständige Informationen auf dieser Website bereitzustellen, übernehmen aber keinerlei Verantwortung, Garantien oder Haftung dafür, dass die durch diese Website bereitgestellten Informationen, richtig, vollständig oder aktuell sind. Wir behalten uns das Recht vor, jederzeit und ohne Vorankündigung die Informationen auf dieser Website zu ändern und verpflichten uns nicht, die enthaltenen Informationen zu aktualisieren. Alle Links zu externen Anbietern wurden zum Zeitpunkt ihrer Aufnahme auf ihre Richtigkeit überprüft, dennoch haften wir nicht für Inhalte und Verfügbarkeit von Websites, die mittels Hyperlinks zu erreichen sind. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die durch Inhalte verknüpfter Seiten entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde. Dabei ist es gleichgültig, ob der Schaden direkter, indirekter oder finanzieller Natur ist oder ein sonstiger Schaden vorliegt, der sich aus Datenverlust, Nutzungsausfall oder anderen Gründen aller Art ergeben könnte.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>Datenschutz</h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Für die Sicherheit der Datenübertragung im Internet können wir keine Gewähr übernehmen, insbesondere besteht bei der Übertragung von Daten per E-Mail die Gefahr des Zugriffs durch Dritte.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Einer Nutzung der im Impressum sowie auf sämtlichen Website veröffentlichten Kontaktdaten durch Dritte zu Werbezwecken wird hiermit ausdrücklich widersprochen. Der Betreiber behält sich für den Fall unverlangt zugesandter Werbe- oder Informationsmaterialien ausdrücklich rechtliche Schritte vor.
        </p>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Sollten einzelne Regelungen oder Formulierungen dieses Haftungsausschlusses unwirksam sein oder werden, bleiben die übrigen Regelungen in ihrem Inhalt und ihrer Gültigkeit hiervon unberührt.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>Google Analytics</h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. („Google“). Google Analytics verwendet sog. „Cookies“, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Im Falle der Aktivierung der IP-Anonymisierung auf dieser Webseite, wird Ihre IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren. Der aktuelle Link ist <a href="http://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clr-primary)' }}>http://tools.google.com/dlpage/gaoptout?hl=de</a>.
        </p>
        <p style={{ lineHeight: '1.6' }}>
          Google Analytics Bedingungen: <a href="http://www.google.com/analytics/terms/de.html" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clr-primary)' }}>http://www.google.com/analytics/terms/de.html</a>.
        </p>

      </div>
    </section>
  );
}
