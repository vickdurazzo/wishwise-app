import { WishlistItem, ResolvedItem } from '../types';

export const ASSETS = {
  logo: '/logo.svg',
  profile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9IMIY4QhnGibUf6EpDRrdspTNMfNNEbgnrTphJ8rPKIfRNFo8j6c51fXRzg8aWGwk_4BmQh4jP3V-ciT7pG_yEymRT0I8YTQL8xYVBecoZ3D6j5D2bMpubSiOn-AEzd8Li-8yQLebTX6-SYHX5j-_D503Qcru4T58AkmcWNYu_ARe29EY1g0OKVHXEcHJnJM9nX-PCDh_O3fpJCI8fUGi5uhy5deo4ZOrBe5-FeGrCy36hC8KdAwwfg',
  headphones: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmyf9mIaxnMgYerh-bHiDCW6wVmQCcm1EE9Gyt5lE1eho_52a8TqRfxiifQjKvTLEySJNhENsXXzsm3LcTNu8ZVDTbK7jAJpPyQbdWsuZpGYVUED_ulLwSyh6jGGKFDaklldT8-DpnAQecungUdfAguj6U4TxXmiJFN4tp4GHs7bPhJOUsvWrh4pLTtpZ0A9xP3bT5B0GHW0vNOJXmJ0X9c6bXmQm4NEr6ptBUzIUKDtwhCNIi-0H-Bw',
  frenchPress: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ13mp0CYRVCHGc9oGruq2mUHltDvls-h5-AClyqfOFTMjRLFPMUNBslxKtbSya0-dlBzxrQ9_Xpuaq-jMCmROZyAYHpnsifHS2c-eAASvNqsfjDRDIFEdR9j4_7HF290XXfWrQsqvGYCUc8BFW4SpzGV0jRFCy8Ui4S7JlGFnncYDrfe4dN4IvDi0kH8SxqOokw4xIuxjjewMsrPNqQXaoDGG_BFnUkEyVl37tquB3Xzy5kmzglA__w',
  powerStrip: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmKcpujgoTjUuNlxV8iF9zjg-SchDf2YHXi6ZyeD5ZrrUtmbC0PG8r3clVnCqUa6Y_-PnGVXieFNHd46ZsBxXWMmi4Ql-xnvmZXYGyKuKyDy3Hy32THirCdK8dkb85gGHfWUfMzmOiscmB_NVmLZH_8QhQI-tZaOPFCwWSrUUNgN3gYvcQCMWbXvrNtG_kRyxM_VChIvgmJnXXREXBO4jbIHxtykY2Mr8ycea9djCVlXzb1PhDesRWrA',
  windbreaker: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6ZLqSs-en2Nmu2Zt4LvFgxNhG7WNgXBrurDysLw33yXKjXXJ-lL1psUKtlJx6x3kxu-Nc7z5VOToXoj_WqW6vgbRxjMx0iawVroOSZ1Uh7qWLqaRbiZCwP170pPw3qaavaUEar5CVxc-PqMEtTaMexIgmAfwl2nGS6wOc16mw-xZHgBlHqgu009PuuruM1cV_mbfESgrHTt2PqqvtY6HSd3hwULEQkxYuU-CrXNJtTtRBYd-pglMqHQ',
  keyboard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABdUsNGRxVMCvAVL6gY2FUTx1xafly5L8TKE6a4q2KeO0CDDx2Au3ipiRXIcMrp65h-rXKcu8kwksPT3RnIPxVxbAD881iokUw4HrJZlfa730o7xvwcdlY1PMydGB50ImsD2EXHRGSJHiJV2W4y-_aX9l3_5PFEecFkLV0F1LDezgy6FX9sz70OJir4MZ8U_Q8fduSnuWpn2fxziAad5ZcAUxfEEnktX5cMqmU1t6XXuPc9Q7AcVCmgw',
  monitorArm: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAP5y-aSACaUPQqneg9FHeBuO9NGGWP2hi_rXoEZgY7qo_OH158jIyaDr_EnSFNv-SOEaug0hgdQ8kJANFObXIj-62Qdx6IxvTGecU9s7khG7XaMTceTAEzmmhVa7IzoqsT8r_AU877eFPtSvgbjYj-RgMS54s3dLsJVk7Sa8WvQSaF2ut7FYAKtUtE1VhcUkr4AICQa1j-QvANYfswajETLrExkJd8NVovW4Te_1mTJ-jsXc8XkfGhw',
  zenBowl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2kuAtxCahfc_9EzQFA2OYIC6GTAabCnz-c8geBrl6h3OlRrt_9oal5e-utnkzcBlmzLnTfT5U_blSMo9F2UrHPf_39DIoz7HvA4fTrvyASs8G0OOTUfYrXTfVjxK2BE9zunaWT_fB5otx_hoIUKdacrCyb2rLdsEN1k6GognOxznNexbFs0gaveHwNL-U9JJeSFhYg4hVd7B-JLr6JIBMkSgpGsihXeNip7yPeZG6xZ4e8EXIZQ4D7A',
  zenTea: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_ar3HcoEyj51tOm8ZlRz1EHsWJgebw2s5Nx5UUmuMFxIQODbg-zPZuK9ChmlXSmqK8nFiH00k7cOh-VWI-QoYcCMCaBBXK5JXoUYuhbrrhTfuAVrbyKUq_oMO5rpwDe9F6JCf7gCCX1KdkWczTiJQFkUjYWFsve29TRI18MH_kyRulI4SpaD7L7U_b10It_NfgyWoR7fq6I2OW5Zza2cBi77MHhbrUzNKRrvi5euzeUUnYbMMJnrLtA',
  jacketHistory: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcgvEWLG3sxvpc6xb4mfGGp7sZ-7xmpZxrKSPYsn2NwSLboUmWaXYIubee4QkW356i6299MaC9TadeNh95oTieE_CMqW4J5IKNIsUUIB4lSWsgmJVO8xklPgvngV_LBY3ThueUvJvyuRG2IixxYSsExgmLc2Mot7e4qVmNGEvbGv-bfSy7JN1N01-DfAkARyOTgv4MEdxEnrDKuNlL4WlhxENbh6SW-2meOVGE1X-p9CFE3H28Aq1Cew',
  gamerHeadset: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiMC3bTJ_Fb9lSUk3Gcmj6E8P3cAoJFedaO6-1SZ_4hQpyjzLE6Sgc-hsWhIdN1hY3pfQ0a-5mwD8g05OLGn9lu819UCRuUS-ajEJ9zmWNANsK-TMryjSmwFzbKqWvJIJ6nS6_SNjG4JXvd2m4YtmMR2sK4iqEDb-4xKb31PITHyqiNAuSB0_GG5blYqDIv-Y5KZXQCpVGFg5XTxktuj8f5PqngN--qxbl7sjCLHOWm_siPR8SWj753g',
  deskLamp: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMGB1nTvEFJlKWwxrQRJsDmbxUm-HVgGlfhAlX4UiYJtVKaWvRCNM8DP0EYHE0QwGBAV9ZzSMpd_7opXDtyJI_WGeIjC132hqcGIVuTdIJWmK6eevfYY6KnRMstv5WAlnqOpm2B-ejU2q0QcpsJEKgWGl6s0PYeR0kLx7TDtVNKUaap4LzfaF0UOw0SNQ1ENkt-GtXgyagzO97RcWYp7CeQ1rFw5jdlRx083YpPurnKar-iYnsn8AUrQ',
  cupsKit: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpaW1i-UE2pt529C_pL1F-9DEpe6J9_fyaddrB0IfXFTTnsD0sjnL7P_Dk44ymVOUGLHsR6ZFoNl6ttOsPQ5feAic5VvfU4Y2RrOj6xQ4tPYIEFHLYVRbpUS0BYLIzdJEkGqsI9VyC9UA3c6duKpSwMFmYqJ_MQ9584YvUOUMWYq-ZGa-hPTiV3D1dNF0Rcmt0c4-8k-xwnIyNrueTc36wdb-zfo8xD5wrn2XNrEGX5a1ScaD7wRe0OQ'
};

export const INITIAL_READY_ITEMS: WishlistItem[] = [
  {
    id: 'decision-item-1',
    name: 'Fone Bluetooth ANC',
    price: 389,
    category: 'puro-desejo',
    incubationDays: 14,
    daysElapsed: 14,
    url: 'https://www.amazon.com.br/dp/B08XJ8B7SZ',
    imageUrl: ASSETS.headphones,
    reflectionText: 'Vi influenciadores elogiando o cancelamento de ruído, mas já tenho um fone de ouvido funcionando.',
    status: 'ready'
  },
  {
    id: 'decision-item-2',
    name: 'Cafeteira Prensa Francesa',
    price: 120,
    category: 'util',
    incubationDays: 7,
    daysElapsed: 7,
    url: 'https://www.mercadolivre.com.br/p/MLB28194012',
    imageUrl: ASSETS.frenchPress,
    reflectionText: 'Achei o ritual de fazer café elegante, mas já tenho método coado em casa.',
    status: 'ready'
  }
];

export const INITIAL_WISHLIST_ITEMS: WishlistItem[] = [
  {
    id: 'wish-item-1',
    name: 'Filtro de Linha Inteligente Wi-Fi',
    price: 149.90,
    category: 'util',
    incubationDays: 14,
    daysElapsed: 8,
    url: 'https://www.amazon.com.br/dp/B08X89KL34',
    imageUrl: ASSETS.powerStrip,
    reflectionText: 'Queria ligar e desligar aparelhos por voz, porém uma régua tradicional já atende bem.',
    status: 'quarantine'
  },
  {
    id: 'wish-item-2',
    name: 'Jaqueta Corta-vento Verde Militar',
    price: 280.00,
    category: 'puro-desejo',
    incubationDays: 14,
    daysElapsed: 12,
    url: 'https://www.zara.com/br/pt/jaqueta-corta-vento-p03829102.html',
    imageUrl: ASSETS.windbreaker,
    reflectionText: 'Achei a cor linda na vitrine, mas meu guarda-roupa já tem agasalhos suficientes.',
    status: 'quarantine'
  },
  {
    id: 'wish-item-3',
    name: 'Teclado Mecânico Ergonômico Compacto',
    price: 320.00,
    category: 'puro-desejo',
    incubationDays: 7,
    daysElapsed: 2,
    url: 'https://pt.aliexpress.com/item/1005004819203810.html',
    imageUrl: ASSETS.keyboard,
    reflectionText: 'O som dos switches parece gostoso, mas o teclado do notebook funciona com perfeição.',
    status: 'quarantine'
  },
  {
    id: 'wish-item-4',
    name: 'Suporte Articulado de Monitor Duplo',
    price: 189.90,
    category: 'essencial',
    incubationDays: 7,
    daysElapsed: 4,
    url: 'https://www.mercadolivre.com.br/p/MLB19283746',
    imageUrl: ASSETS.monitorArm,
    reflectionText: 'Sinto um leve incômodo no pescoço. Se continuar até o fim da quarentena, comprarei com consciência.',
    status: 'quarantine'
  }
];

export const INITIAL_RESOLVED_ITEMS: ResolvedItem[] = [
  {
    id: 'resolved-1',
    name: 'Jaqueta Corta-vento Verde Militar',
    price: 280.00,
    category: 'puro-desejo',
    imageUrl: ASSETS.jacketHistory,
    url: 'https://www.zara.com/br/pt/jaqueta-corta-vento-p03829102.html',
    resolvedDate: '24 de Outubro',
    quarantineDays: 14,
    reflectionQuote: 'Decidi esperar e percebi que já tinha casacos suficientes para a estação.',
    type: 'saved'
  },
  {
    id: 'resolved-2',
    name: 'Headset Gamer com LED RGB',
    price: 350.00,
    category: 'puro-desejo',
    imageUrl: ASSETS.gamerHeadset,
    url: 'https://www.amazon.com.br/dp/B08XJ8B7SZ',
    resolvedDate: '12 de Outubro',
    quarantineDays: 14,
    reflectionQuote: 'O que eu já tenho funciona perfeitamente, era só vontade passageira de novidade.',
    type: 'saved'
  },
  {
    id: 'resolved-3',
    name: 'Luminária de Mesa Articulada',
    price: 110.00,
    category: 'util',
    imageUrl: ASSETS.deskLamp,
    url: 'https://www.mercadolivre.com.br/p/MLB28194012',
    resolvedDate: '28 de Setembro',
    quarantineDays: 7,
    reflectionQuote: 'Reorganizei minha mesa e a iluminação natural já resolveu.',
    type: 'saved'
  },
  {
    id: 'resolved-4',
    name: 'Kit com 4 Xícaras Esmaltadas',
    price: 95.00,
    category: 'puro-desejo',
    imageUrl: ASSETS.cupsKit,
    url: 'https://pt.aliexpress.com/item/1005004819203810.html',
    resolvedDate: '15 de Setembro',
    quarantineDays: 7,
    reflectionQuote: 'Compreendi que era apenas encanto visual e meu armário já está cheio.',
    type: 'saved'
  },
  {
    id: 'resolved-5',
    name: 'Mochila Impermeável para Notebook',
    price: 210.00,
    category: 'essencial',
    imageUrl: ASSETS.monitorArm,
    url: 'https://www.amazon.com.br/dp/B08X89KL34',
    resolvedDate: '02 de Setembro',
    quarantineDays: 14,
    reflectionQuote: 'Após 14 dias confirmou-se essencial pois a anterior rasgou a alça.',
    type: 'bought'
  },
  {
    id: 'resolved-6',
    name: 'Suporte Ergonômico de Notebook',
    price: 85.00,
    category: 'util',
    imageUrl: ASSETS.powerStrip,
    url: 'https://www.mercadolivre.com.br/p/MLB19283746',
    resolvedDate: '19 de Agosto',
    quarantineDays: 7,
    reflectionQuote: 'Ajudou muito na ergonomia do home office.',
    type: 'bought'
  },
  {
    id: 'resolved-7',
    name: 'Livro de Hábitos Atômicos',
    price: 49.90,
    category: 'util',
    imageUrl: ASSETS.zenTea,
    url: 'https://www.amazon.com.br/dp/8550807567',
    resolvedDate: '08 de Agosto',
    quarantineDays: 7,
    reflectionQuote: 'Leitura transformadora para a rotina diária.',
    type: 'bought'
  }
];
