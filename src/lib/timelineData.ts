/** Cronología editorial verificada para Cuartelia.
 * No se publican los hitos de Gálvez 1950/1959/1968/1969 ni las reuniones
 * preparatorias de 07/06 y 18/07/1970 hasta confirmar documentación.
 */
export type TimelineCategory = 'antecedente'|'fundacion'|'operativo'|'conflicto'|'institucional'|'federacion'|'normativa'|'internacional';
export interface TimelineSource { label:string; url:string }
export interface TimelineEvent {
  id:string; date:string; dateLabel:string; title:string; description:string;
  context:string; category:TimelineCategory; sources:TimelineSource[];
}
export interface TimelineGroup {
  id:'argentina'|'santa-fe'; label:string; introduction:string; events:TimelineEvent[];
}
export const nationalTimeline: TimelineEvent[] = [
  {
    "id": "arg-1860",
    "date": "1860-12-08",
    "dateLabel": "8 dic 1860",
    "title": "Primer antecedente oficial",
    "description": "Un decreto dispone preparar una compañía de bomberos con vecinos idóneos.",
    "context": "El jefe de Policía Rafael Trelles debía disponer de una bomba con sus útiles y organizar a quienes pudieran operarla. Es un antecedente oficial, no la fundación del primer cuerpo voluntario.",
    "category": "antecedente",
    "sources": [
      {
        "label": "Bomberos Voluntarios de La Boca — Historia",
        "url": "https://www.bomberosdelaboca.org.ar/nuestra-historia"
      }
    ]
  },
  {
    "id": "arg-1870",
    "date": "1870-01-02",
    "dateLabel": "2 ene 1870",
    "title": "Bomberos de la Capital",
    "description": "La Policía asigna treinta vigilantes a funciones bomberiles.",
    "context": "El cuerpo oficial pertenecía al ámbito policial. Conviene distinguir su origen del movimiento bomberil voluntario de 1884.",
    "category": "institucional",
    "sources": [
      {
        "label": "Bomberos Voluntarios de La Boca — Historia",
        "url": "https://www.bomberosdelaboca.org.ar/nuestra-historia"
      }
    ]
  },
  {
    "id": "arg-1883",
    "date": "1883-12",
    "dateLabel": "Dic 1883",
    "title": "Un incendio moviliza a La Boca",
    "description": "Oreste Liberti organiza una cadena vecinal de baldes para responder a un incendio en Corti y Rivas.",
    "context": "Las construcciones de madera y las dificultades de acceso agravaban el riesgo de incendio. La reacción del vecindario fue espontánea.",
    "category": "antecedente",
    "sources": [
      {
        "label": "Bomberos Voluntarios de La Boca — Historia",
        "url": "https://www.bomberosdelaboca.org.ar/nuestra-historia"
      }
    ]
  },
  {
    "id": "arg-1884-convocatoria",
    "date": "1884",
    "dateLabel": "Principios de 1884",
    "title": "Convocatoria a los vecinos",
    "description": "Tomás Liberti, sus hijos Oreste y Atilio y otras personas convocan a crear un cuerpo de bomberos voluntarios.",
    "context": "La iniciativa se difundió mediante una invitación en italiano para reunirse en el Ateneo Iris y debatir una asociación filantrópica.",
    "category": "fundacion",
    "sources": [
      {
        "label": "Bomberos Voluntarios de La Boca — Historia",
        "url": "https://www.bomberosdelaboca.org.ar/nuestra-historia"
      }
    ]
  },
  {
    "id": "arg-1884-fundacion",
    "date": "1884-06-02",
    "dateLabel": "2 jun 1884",
    "title": "Fundación de Bomberos Voluntarios de La Boca",
    "description": "Se aprueban las bases de la primera asociación de bomberos voluntarios del país.",
    "context": "La Asociación Italiana de Bomberos Voluntarios de La Boca eligió como presidente de su primera comisión directiva a Tomás Liberti. El 2 de junio se recuerda como Día del Bombero Voluntario.",
    "category": "fundacion",
    "sources": [
      {
        "label": "Bomberos Voluntarios de La Boca — Historia",
        "url": "https://www.bomberosdelaboca.org.ar/nuestra-historia"
      },
      {
        "label": "Bomberos de Argentina — Historia",
        "url": "https://www.bomberosra.org.ar/snbv-historia"
      }
    ]
  },
  {
    "id": "arg-1884-estatutos",
    "date": "1884-08-02",
    "dateLabel": "2 ago 1884",
    "title": "Reconocimiento de estatutos",
    "description": "Se aprueban los estatutos de la asociación y se reconoce su personería jurídica.",
    "context": "El crecimiento institucional permitió sostener la formación y adquisición de herramientas con respaldo de los vecinos.",
    "category": "institucional",
    "sources": [
      {
        "label": "Bomberos Voluntarios de La Boca — Historia",
        "url": "https://www.bomberosdelaboca.org.ar/nuestra-historia"
      }
    ]
  },
  {
    "id": "arg-1885",
    "date": "1885-11-14",
    "dateLabel": "14 nov 1885",
    "title": "Bautismo de fuego",
    "description": "El cuerpo atiende un incendio en una fábrica de velas de Barracas al Sud.",
    "context": "La intervención puso a prueba la organización y los recursos todavía limitados de sus integrantes.",
    "category": "operativo",
    "sources": [
      {
        "label": "Bomberos de Argentina — Historia",
        "url": "https://www.bomberosra.org.ar/snbv-historia"
      }
    ]
  },
  {
    "id": "arg-1889",
    "date": "1889-11-07",
    "dateLabel": "7 nov 1889",
    "title": "Prohibición de concurrir a incendios",
    "description": "Un decreto del gobierno de Miguel Juárez Celman prohíbe la actuación de los voluntarios en siniestros de la Capital.",
    "context": "La medida respondió a objeciones del cuerpo oficial sobre coordinación y mandos. La historia institucional de La Boca fecha el decreto el 7 de noviembre; ciertas fuentes secundarias citan el 9.",
    "category": "conflicto",
    "sources": [
      {
        "label": "Bomberos Voluntarios de La Boca — Historia",
        "url": "https://www.bomberosdelaboca.org.ar/nuestra-historia"
      }
    ]
  },
  {
    "id": "arg-1890",
    "date": "1890-09-05",
    "dateLabel": "5 sep 1890",
    "title": "Retorno a la actividad",
    "description": "El gobierno de Carlos Pellegrini da curso al pedido para que los bomberos de La Boca vuelvan a actuar.",
    "context": "Tras la Revolución de 1890, los voluntarios habían colaborado en seguridad vecinal y asistencia a heridos. La institución registra el trámite de rehabilitación el 5 de septiembre.",
    "category": "institucional",
    "sources": [
      {
        "label": "Bomberos Voluntarios de La Boca — Historia",
        "url": "https://www.bomberosdelaboca.org.ar/nuestra-historia"
      }
    ]
  },
  {
    "id": "arg-1900",
    "date": "1900-07-15",
    "dateLabel": "15 jul 1900",
    "title": "Inauguración del nuevo edificio",
    "description": "Se inaugura la sede de Bomberos Voluntarios de La Boca en Brandsen 567.",
    "context": "La ceremonia contó con Julio A. Roca como padrino y Luisa de Malaspina como madrina.",
    "category": "institucional",
    "sources": [
      {
        "label": "Bomberos Voluntarios de La Boca — Historia",
        "url": "https://www.bomberosdelaboca.org.ar/nuestra-historia"
      }
    ]
  },
  {
    "id": "arg-1954-federacion",
    "date": "1954-02-01",
    "dateLabel": "1 feb 1954",
    "title": "Federación Argentina de Asociaciones",
    "description": "Se crea una federación nacional que reúne asociaciones de bomberos voluntarios.",
    "context": "La articulación entre instituciones dio impulso al intercambio y a futuras federaciones provinciales.",
    "category": "federacion",
    "sources": [
      {
        "label": "Municipalidad de Villa Gesell — Reseña histórica",
        "url": "https://www.gesell.gob.ar/novedad/30308/dia-del-bombero-voluntario.html"
      },
      {
        "label": "Bomberos de Argentina — Historia",
        "url": "https://www.bomberosra.org.ar/snbv-historia"
      }
    ]
  },
  {
    "id": "arg-1954-congreso",
    "date": "1954-09-25",
    "dateLabel": "25 sep 1954",
    "title": "Primer Congreso de Bomberos Voluntarios",
    "description": "Se realiza en Lanús el primer congreso del movimiento bomberil voluntario.",
    "context": "Los congresos ayudaron a coordinar experiencias y necesidades de las distintas asociaciones.",
    "category": "federacion",
    "sources": [
      {
        "label": "Municipalidad de Villa Gesell — Reseña histórica",
        "url": "https://www.gesell.gob.ar/novedad/30308/dia-del-bombero-voluntario.html"
      }
    ]
  },
  {
    "id": "arg-1988",
    "date": "1988-11-20",
    "dateLabel": "20 nov 1988",
    "title": "Consejo de Federaciones",
    "description": "Se conforma el Consejo de Federaciones de Bomberos Voluntarios de la República Argentina.",
    "context": "La reseña institucional confirma la conformación en 1988; un antecedente parlamentario consigna el 20 de noviembre como fecha puntual.",
    "category": "federacion",
    "sources": [
      {
        "label": "Bomberos de Argentina — Historia",
        "url": "https://www.bomberosra.org.ar/snbv-historia"
      },
      {
        "label": "Cámara de Diputados — Consejo Nacional (antecedente parlamentario)",
        "url": "https://www.hcdn.gob.ar/comisiones/permanentes/cacym/proyecto.html?exp=5184-D-2014"
      }
    ]
  },
  {
    "id": "arg-1998",
    "date": "1998",
    "dateLabel": "1998",
    "title": "Ley Nacional 25.054",
    "description": "Se sanciona un marco legal nacional para el Sistema de Bomberos Voluntarios.",
    "context": "La norma fue modificada posteriormente y se complementa con legislación provincial e institucional.",
    "category": "normativa",
    "sources": [
      {
        "label": "Argentina.gob.ar — Ley 25.054",
        "url": "https://www.argentina.gob.ar/normativa/nacional/ley-25054-54903/actualizacion"
      }
    ]
  },
  {
    "id": "arg-2006",
    "date": "2006-10-27",
    "dateLabel": "27 oct 2006",
    "title": "Fundación de OBA",
    "description": "La Organización de Bomberos Americanos se funda en Montevideo.",
    "context": "Participan representantes de Argentina, Chile, Paraguay, Uruguay y Venezuela. Es un hito de cooperación internacional.",
    "category": "internacional",
    "sources": [
      {
        "label": "Organización de Bomberos Americanos — Origen",
        "url": "https://bomberosamericanos.org/en/acerca-de-oba"
      }
    ]
  },
  {
    "id": "arg-2009",
    "date": "2009-12",
    "dateLabel": "Dic 2009",
    "title": "OBA ingresa al registro de la OEA",
    "description": "OBA pasa a integrar el registro de organizaciones de la sociedad civil de la OEA.",
    "context": "Este hito corresponde a cooperación continental y no a la estructura orgánica del sistema argentino.",
    "category": "internacional",
    "sources": [
      {
        "label": "Organización de Bomberos Americanos — Origen",
        "url": "https://bomberosamericanos.org/en/acerca-de-oba"
      }
    ]
  }
];
export const santaFeTimeline: TimelineEvent[] = [
  {
    "id": "sf-1949",
    "date": "1949-11-24",
    "dateLabel": "24 nov 1949",
    "title": "Fundación de Bomberos Voluntarios de Gálvez",
    "description": "Se constituye la primera asociación de bomberos voluntarios de Santa Fe.",
    "context": "Una declaración municipal señala que la primera comisión directiva de 1949 fue presidida por Antonio Ballaris. Por eso no se publica como dato firme su presunta asunción en mayo de 1950.",
    "category": "fundacion",
    "sources": [
      {
        "label": "Bomberos de Argentina — Bomberos de Gálvez",
        "url": "https://www.bomberosra.org.ar/bomberos/144-bomberos-voluntarios-de-galvez"
      },
      {
        "label": "Concejo Municipal de Gálvez — Declaración 721/2024",
        "url": "https://www.concejogalvez.gob.ar/documentos/digesto/digesto.9956.721.pdf"
      }
    ]
  },
  {
    "id": "sf-1970",
    "date": "1970-08-09",
    "dateLabel": "9 ago 1970",
    "title": "Constitución de la Federación Santafesina",
    "description": "Se reúnen en Gálvez asociaciones de distintas ciudades para constituir la Federación.",
    "context": "Los antecedentes legislativos identifican a Rufino, Venado Tuerto, Firmat, Casilda, San Jorge, Esperanza, San Carlos Centro y Gálvez. No se incorporan reuniones preparatorias de junio y julio sin documentación adicional.",
    "category": "federacion",
    "sources": [
      {
        "label": "Cámara de Diputados — Antecedentes Federación Santafesina",
        "url": "https://www4.hcdn.gob.ar/dependencias/dsecretaria/Periodo2020/PDF2020/TP2020/2173-D-2020.pdf"
      }
    ]
  },
  {
    "id": "sf-1971",
    "date": "1971-03-08",
    "dateLabel": "8 mar 1971",
    "title": "Personería jurídica de la Federación",
    "description": "La Federación Santafesina obtiene reconocimiento jurídico provincial.",
    "context": "El registro oficial consigna la Resolución 338 del 8 de marzo de 1971.",
    "category": "institucional",
    "sources": [
      {
        "label": "Registro provincial — Federación Santafesina",
        "url": "https://www.santafe.gov.ar/tramites/igpj-tramiteweb/entidades/17117/show"
      },
      {
        "label": "Cámara de Diputados — Antecedentes Federación Santafesina",
        "url": "https://www4.hcdn.gob.ar/dependencias/dsecretaria/Periodo2020/PDF2020/TP2020/2173-D-2020.pdf"
      }
    ]
  }
];
export const timelineGroups: TimelineGroup[] = [
  {id:'argentina',label:'Argentina',introduction:'Del servicio oficial temprano al movimiento voluntario, las federaciones y la cooperación internacional.',events:nationalTimeline},
  {id:'santa-fe',label:'Santa Fe',introduction:'De la primera asociación de Gálvez a la organización federativa provincial.',events:santaFeTimeline}
];
