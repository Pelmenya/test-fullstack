import { makeAutoObservable } from "mobx";
import client from "~/api/gql";
import { SingleOrder } from "~/screens/Orders/Show/types";
import { ORDER_QUERY } from "./queries";

export default class OrdersShowStore {
  initialized: boolean = false;
  loading: boolean = false;
  order: SingleOrder | null = null;
  id: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadOrder() {
    this.loading = true;
    const orderData = await client.query(ORDER_QUERY, { number: this.id }).toPromise();
    this.order = orderData.data.order;
    this.loading = false;
  }

  initialize(id: string) {
    if (this.initialized) return;
    this.id = id;
    this.initialized = true;
    this.loadOrder();
  }
}
