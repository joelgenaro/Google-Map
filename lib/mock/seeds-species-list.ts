export interface ApiSeedsSpeciesList {
  Species: {
    [key: string]: string;
  };
  'Common name': {
    [key: string]: string;
  };
  Select: {
    [key: string]: number;
  };
  'Seed quantity (g)': {
    [key: string]: number;
  };
}

export const rawApiSeedsSpeciesList: ApiSeedsSpeciesList = {
  Species: {
    '0': 'Jacaranda mimosifolia',
    '1': 'Acacia terminalis',
    '2': 'Doryanthes excelsa',
    '3': 'Acacia longifolia',
    '4': 'Prostanthera marifolia',
    '5': 'Lomandra longifolia',
    '6': 'Leptospermum laevigatum',
    '7': 'Epacris longiflora',
    '8': 'Actinotus helianthi',
    '9': 'Pittosporum undulatum',
    '10': 'Banksia integrifolia',
    '11': 'Acacia suaveolens',
    '12': 'Banksia ericifolia',
    '13': 'Kunzea ambigua',
    '14': 'Dianella caerulea',
    '15': 'Lantana camara',
    '16': 'Angophora costata',
    '17': 'Grevillea buxifolia',
    '18': 'Elaeocarpus reticulatus',
    '19': 'Allocasuarina distyla',
    '20': 'Westringia fruticosa',
    '21': 'Commelina cyanea',
    '22': 'Monotoca elliptica',
    '23': 'Glochidion ferdinandi',
    '24': 'Banksia serrata',
    '25': 'Grevillea speciosa',
    '26': 'Lambertia formosa',
    '27': 'Grevillea linearifolia',
    '28': 'Melaleuca nodosa',
    '29': 'Crowea saligna',
    '30': 'Asparagus aethiopicus',
    '31': 'Dillwynia retorta',
    '32': 'Woollsia pungens',
    '33': 'Banksia marginata',
    '34': 'Brachychiton acerifolius',
    '35': 'Ficinia nodosa',
    '36': 'Ehrharta erecta',
    '37': 'Pteridium esculentum',
    '38': 'Darwinia fascicularis',
    '39': 'Ficus rubiginosa',
    '40': 'Platysace lanceolata',
    '41': 'Bidens pilosa',
    '42': 'Dodonaea triquetra',
    '43': 'Persoonia lanceolata',
    '44': 'Microlaena stipoides',
    '45': 'Hibbertia scandens',
    '46': 'Baeckea imbricata',
    '47': 'Smilax glyciphylla',
    '48': 'Entolasia stricta',
    '49': 'Xanthorrhoea resinosa',
    '50': 'Callistemon citrinus',
    '51': 'Oplismenus hirtellus',
    '52': 'Homalanthus populifolius',
    '53': 'Melaleuca armillaris',
    '54': 'Hakea teretifolia',
    '55': 'Acacia ulicifolia',
    '56': 'Lepidosperma laterale',
    '57': 'Melaleuca quinquenervia',
    '58': 'Ochna serrulata',
    '59': 'Banksia aemula',
    '60': 'Xanthosia pilosa',
    '61': 'Parietaria judaica',
    '62': 'Philotheca buxifolia',
    '63': 'Callistemon linearis',
    '64': 'Eucalyptus botryoides',
    '65': 'Epacris microphylla',
    '66': 'Allocasuarina littoralis',
    '67': 'Pimelea linifolia',
    '68': 'Lasiopetalum ferrugineum',
    '69': 'Calochlaena dubia',
    '70': 'Eragrostis curvula',
    '71': 'Ageratina adenophora',
    '72': 'Tradescantia fluminensis',
    '73': 'Leucopogon microphyllus',
    '74': 'Notelaea longifolia',
    '75': 'Breynia oblongifolia',
    '76': 'Corymbia gummifera',
    '77': 'Actinotus minor',
    '78': 'Lobelia anceps',
    '79': 'Cassytha pubescens',
    '80': 'Eustrephus latifolius',
    '81': 'Hydrocotyle bonariensis',
    '82': 'Casuarina glauca',
    '83': 'Imperata cylindrica',
    '84': 'Rumex sagittatus',
    '85': 'Gleichenia dicarpa',
    '86': 'Dampiera stricta',
    '87': 'Cynodon dactylon',
    '88': 'Acacia linifolia',
    '89': 'Callicoma serratifolia',
    '90': 'Sonchus oleraceus',
    '91': 'Pandorea pandorana',
    '92': 'Senna pendula',
    '93': 'Olearia tomentosa',
    '94': 'Ipomoea indica',
    '95': 'Pittosporum revolutum',
    '96': 'Leptospermum squarrosum',
    '97': 'Allocasuarina portuensis',
    '98': 'Solanum nigrum',
    '99': 'Gonocarpus teucrioides',
    '100': 'Pultenaea tuberculata',
  },
  'Common name': {
    '0': 'Jacaranda',
    '1': 'Sunshine Wattle',
    '2': 'Gymea Lily',
    '3': 'Sallow Wattle',
    '4': 'Seaforth Mintbush',
    '5': 'Spiny-headed Mat-rush',
    '6': 'Coast Tea-tree',
    '7': 'Fuchsia Heath',
    '8': 'Flannel Flower',
    '9': 'Sweet Pittosporum',
    '10': 'Coast Banksia',
    '11': 'Sweet Wattle',
    '12': 'Heath-leaved Banksia',
    '13': 'Tick Bush',
    '14': 'Blue Flax-lily',
    '15': 'Lantana',
    '16': 'Sydney Red Gum',
    '17': 'Grey Spider Flower',
    '18': 'Blueberry Ash',
    '19': 'Black Sheoak',
    '20': 'Coastal Rosemary',
    '21': 'Scurvy Weed',
    '22': 'Tree Broom-heath',
    '23': 'Cheese Tree',
    '24': 'Saw Old-man Banksia',
    '25': 'Red Spider Flower',
    '26': 'Mountain Devil',
    '27': 'Linear-leaf Grevillea',
    '28': 'Pricklyleaf Paperbark',
    '29': 'Willow-leaved Crowea',
    '30': 'Asparagus Fern',
    '31': '',
    '32': '',
    '33': 'Silver Banksia',
    '34': 'Illawarra Flame Tree',
    '35': 'Knobby Club-rush',
    '36': 'Panic Veldt-grass',
    '37': 'Austral Bracken',
    '38': '',
    '39': 'Port Jackson Fig',
    '40': 'Shrubby Platysace',
    '41': "Cobbler's Pegs",
    '42': 'Large-leaf Hop-bush',
    '43': 'Lance Leaf Geebung',
    '44': 'Weeping Grass',
    '45': 'Climbing Guinea Flower',
    '46': 'Spindly Baeckea',
    '47': 'Sweet Sarsaparilla',
    '48': 'Wiry Panic',
    '49': 'Spear Grass-tree',
    '50': 'Crimson Bottlebrush',
    '51': 'Creeping Shade Grass',
    '52': 'Bleeding-heart Tree',
    '53': 'Giant Honey Myrtle',
    '54': 'Needlebush',
    '55': 'Prickly Moses',
    '56': 'Tall Sword-sedge',
    '57': 'Swamp Paperbark',
    '58': 'Ochna',
    '59': 'Wallum Banksia',
    '60': 'Woolly Xanthosia',
    '61': 'Wall Pellitory',
    '62': '',
    '63': 'Stiff Bottlebrush',
    '64': 'Southern Mahogany',
    '65': 'Coral Heath',
    '66': 'Black Sheoak',
    '67': 'Slender Rice Flower',
    '68': 'Rusty Velvet-bush',
    '69': 'Common Ground-fern',
    '70': 'African Love-grass',
    '71': 'Crofton Weed',
    '72': 'Wandering Jew',
    '73': 'Hairy Beard-heath',
    '74': 'Large Mock-olive',
    '75': 'Coffee Bush',
    '76': 'Red Bloodwood',
    '77': 'Lesser Flannel Flower',
    '78': 'Angled Lobelia',
    '79': 'Downy Dodder-laurel',
    '80': 'Wombat Berry',
    '81': 'Pennywort',
    '82': 'Swamp Oak',
    '83': 'Blady Grass',
    '84': 'Rambling Dock',
    '85': 'Gleichenia',
    '86': 'Blue Dampiera',
    '87': 'Couch',
    '88': 'White Wattle',
    '89': 'Black Wattle',
    '90': 'Common Sow-thistle',
    '91': 'Wonga Vine',
    '92': '',
    '93': 'Toothed Daisy-bush',
    '94': 'Purple Morning-glory',
    '95': 'Yellow Pittosporum',
    '96': '',
    '97': 'Nielsen Park Sheoak',
    '98': 'Black Nightshade',
    '99': 'Germander Raspwort',
    '100': '',
  },
  Select: {
    '0': 1,
    '1': 1,
    '2': 1,
    '3': 1,
    '4': 1,
    '5': 1,
    '6': 1,
    '7': 1,
    '8': 1,
    '9': 1,
    '10': 1,
    '11': 1,
    '12': 1,
    '13': 1,
    '14': 1,
    '15': 1,
    '16': 1,
    '17': 1,
    '18': 1,
    '19': 1,
    '20': 1,
    '21': 1,
    '22': 1,
    '23': 1,
    '24': 1,
    '25': 1,
    '26': 1,
    '27': 1,
    '28': 1,
    '29': 1,
    '30': 1,
    '31': 1,
    '32': 1,
    '33': 1,
    '34': 1,
    '35': 1,
    '36': 1,
    '37': 1,
    '38': 1,
    '39': 1,
    '40': 1,
    '41': 1,
    '42': 1,
    '43': 1,
    '44': 1,
    '45': 1,
    '46': 1,
    '47': 1,
    '48': 1,
    '49': 1,
    '50': 1,
    '51': 1,
    '52': 1,
    '53': 1,
    '54': 1,
    '55': 1,
    '56': 1,
    '57': 1,
    '58': 1,
    '59': 1,
    '60': 1,
    '61': 1,
    '62': 1,
    '63': 1,
    '64': 1,
    '65': 1,
    '66': 1,
    '67': 1,
    '68': 1,
    '69': 1,
    '70': 1,
    '71': 1,
    '72': 1,
    '73': 1,
    '74': 1,
    '75': 1,
    '76': 1,
    '77': 1,
    '78': 1,
    '79': 1,
    '80': 1,
    '81': 1,
    '82': 1,
    '83': 1,
    '84': 1,
    '85': 1,
    '86': 1,
    '87': 1,
    '88': 1,
    '89': 1,
    '90': 1,
    '91': 1,
    '92': 1,
    '93': 1,
    '94': 1,
    '95': 1,
    '96': 1,
    '97': 1,
    '98': 1,
    '99': 1,
    '100': 1,
  },
  'Seed quantity (g)': {
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
    '10': 0,
    '11': 0,
    '12': 0,
    '13': 0,
    '14': 0,
    '15': 0,
    '16': 0,
    '17': 0,
    '18': 0,
    '19': 0,
    '20': 0,
    '21': 0,
    '22': 0,
    '23': 0,
    '24': 0,
    '25': 0,
    '26': 0,
    '27': 0,
    '28': 0,
    '29': 0,
    '30': 0,
    '31': 0,
    '32': 0,
    '33': 0,
    '34': 0,
    '35': 0,
    '36': 0,
    '37': 0,
    '38': 0,
    '39': 0,
    '40': 0,
    '41': 0,
    '42': 0,
    '43': 0,
    '44': 0,
    '45': 0,
    '46': 0,
    '47': 0,
    '48': 0,
    '49': 0,
    '50': 0,
    '51': 0,
    '52': 0,
    '53': 0,
    '54': 0,
    '55': 0,
    '56': 0,
    '57': 0,
    '58': 0,
    '59': 0,
    '60': 0,
    '61': 0,
    '62': 0,
    '63': 0,
    '64': 0,
    '65': 0,
    '66': 0,
    '67': 0,
    '68': 0,
    '69': 0,
    '70': 0,
    '71': 0,
    '72': 0,
    '73': 0,
    '74': 0,
    '75': 0,
    '76': 0,
    '77': 0,
    '78': 0,
    '79': 0,
    '80': 0,
    '81': 0,
    '82': 0,
    '83': 0,
    '84': 0,
    '85': 0,
    '86': 0,
    '87': 0,
    '88': 0,
    '89': 0,
    '90': 0,
    '91': 0,
    '92': 0,
    '93': 0,
    '94': 0,
    '95': 0,
    '96': 0,
    '97': 0,
    '98': 0,
    '99': 0,
    '100': 0,
  },
};