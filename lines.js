/* Věty pro oznámení. Sdílí je aplikace i service worker. Každá hodina dostane jinou větu. */
(function (g) {
  var L = [
    "Tahle hodina se už nevrátí.",
    "Co právě teď odkládáš?",
    "Zvedni hlavu. Podívej se kolem sebe.",
    "Proč právě teď skroluješ?",
    "Napiš někomu, na kom ti záleží.",
    "Napij se vody. Pomalu.",
    "Rozhýbej se. Aspoň třicet vteřin.",
    "Co z dneška budeš za deset let chtít zpátky?",
    "Nic nemusíš stihnout. Jen být tady.",
    "Ramena dolů. Čelist uvolni.",
    "Jedna věc. Teď. Jen ta jedna.",
    "Udělej dnes něco poprvé.",
    "Dívej se z okna deset vteřin. Nic víc.",
    "Pojmenuj tři věci, které jsou dnes dobře.",
    "Usměj se. Bez důvodu. Funguje to.",
    "Zavři oči na tři dechy.",
    "Tvoje tělo ti něco říká. Poslechni ho.",
    "Odlož telefon na deset minut.",
    "Jdi ven, i kdyby na pět minut.",
    "Dnes ti zbývá míň času než ráno. Co s ním uděláš?",
    "Kdo by dnes ocenil tvou zprávu?",
    "Na co čekáš? Začni dvěma minutami.",
    "Studená voda na obličej. Teď.",
    "Narovnej záda. Zhluboka se nadechni.",
    "Tohle je ten život. Žádná zkouška.",
    "Zpomal o jeden stupeň.",
    "Udělej něco, co tě zítra potěší.",
    "Pochval se za jednu věc z dneška.",
    "Zbytek notifikací vypni. Tuhle nech.",
    "Kdy byl poslední opravdový smích? Zkus ho dnes.",
    "Dej pozornost jedné věci a nic jiného.",
    "Nejsi pozadu. Jsi tady.",
    "Dnešek se počítá.",
    "Protáhni se. Tělo ti poděkuje.",
    "Zavolej někomu místo psaní.",
    "Jaká malá věc by ti teď zlepšila den?",
    "Dýchej. Čtyři doby dovnitř, šest ven.",
    "Za pár let budeš chtít být zase tady. Tak buď.",
    "Nehledej pravý čas. Tohle je ten čas.",
    "Zastav se. Co cítíš?",
    "Ať je to jakkoli těžké, dýchej. A pak krok.",
    "Vyber dnes jedinou důležitou věc.",
    "Poděkuj tělu. Nese tě celý den.",
    "Čas je jediná věc, kterou ti nikdo nevrátí."
  ];
  g.LYG_LINES = L;
  g.lygLine = function (d, custom) {
    if (custom && String(custom).trim()) return String(custom).trim();
    var s = new Date(d.getFullYear(), 0, 0);
    var doy = Math.floor((d - s) / 86400000);
    return L[(doy * 16 + d.getHours()) % L.length];
  };
})(self);
