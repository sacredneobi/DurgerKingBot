import Main from "./main";
import translation from "./admin/translation";
import goods from "./admin/goods";
import articles from "./admin/articles";
import clients from "./admin/clients";
import orders from "./admin/orders";

const adminPages = [translation, goods, articles, clients, orders];

export { Main, adminPages };
