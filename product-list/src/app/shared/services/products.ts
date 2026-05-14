import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { createClient } from '@supabase/supabase-js'
import { ProductModel } from '../models/productmodel';

@Injectable({
  providedIn: 'root',
})
export class Products {
  supabase = createClient('https://knosbttzvwpgfqcajgja.supabase.co', 'sb_publishable_SD-N7dUmg29qihR6IBxOrw_RjPnCtMM');


  // productlist: Product[] = [];

  productlist = signal<Product[]>([]);

  productlistInsertChannel;
  productlistDeleteChannel;

  productdetail = signal<Product>({
    "id": 0,
    "name": "n/a",
    "description": "n/a",
    "specs": "n/a",
    "stock": 0,
    "price": 0
  })

  constructor(){
    this.getAllProducts();

    this.productlistInsertChannel = this.supabase.channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'products' },
      (payload) => {
        let tmpProduct = new ProductModel(payload.new);
        this.productlist.update(list => [...list, tmpProduct]);
        // console.log('Change received!', payload.new);
      }
    )
    .subscribe()

    this.productlistDeleteChannel = this.supabase.channel('custom-delete-channel')
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'products' },
      (payload) => {
        // console.log('Change received!', payload)
        // let tmpProduct = new ProductModel(payload.old);
        let tmpProductId = payload.old['id'];
        this.productlist.update(list => list.filter(product => product.id != tmpProductId));
      }
    )
    .subscribe()
    // this.productlist.set([
    //   {
    //     "name": "Gaming Maus",
    //     "description": "Eine ergonomische Gaming-Maus mit hoher Präzision und einstellbarer DPI. Ideal für FPS- und MOBA-Spiele, bietet sie eine langlebige Bauweise und komfortable Seitentasten für schnelles Reagieren.",
    //     "specs": "dpi: 6400, cable length: 1.8m, color: Schwarz",
    //     "stock": 120,
    //     "price": 2500000
    //   },
    //   {
    //     "name": "USB-C Kabel",
    //     "description": "Robustes Ladekabel für Smartphones, Tablets und Laptops. Unterstützt schnelles Laden und Datenübertragung. Perfekt für den täglichen Einsatz zu Hause, im Büro oder unterwegs.",
    //     "specs": "length: 1m, color: Weiß, type: USB-C zu USB-A",
    //     "stock": 300,
    //     "price": 4800
    //   },
    //   {
    //     "name": "Mechanische Tastatur",
    //     "description": "Hochwertige mechanische Tastatur mit RGB-Hintergrundbeleuchtung. Die schnellen Switches sorgen für präzise Eingaben und langen Schreibkomfort. Ideal für Gamer und Vielschreiber.",
    //     "specs": "switches: Red, connection: USB, color: Schwarz",
    //     "stock": 85,
    //     "price": 79.90
    //   },
    //   {
    //     "name": "HDMI Kabel",
    //     "description": "Ein zuverlässiges HDMI 2.1 Kabel, das gestochen scharfe Bilder in 4K und 8K Qualität liefert. Geeignet für Fernseher, Monitore, Konsolen und Projektoren. Unterstützt HDR und hohe Bildwiederholraten.",
    //     "specs": "length: 2m, version: 2.1, color: Schwarz",
    //     "stock": 250,
    //     "price": 12.99
    //   },
    //   {
    //     "name": "Externe SSD",
    //     "description": "Leistungsstarke und kompakte externe SSD für schnelle Datenübertragung. Perfekt für große Dateien, Gaming-Bibliotheken oder als Backup-Lösung. Stoßfestes Gehäuse für den mobilen Einsatz.",
    //     "specs": "capacity: 1TB, interface: USB 3.2, color: Silber",
    //     "stock": 60,
    //     "price": 109.99
    //   },
    //   {
    //     "name": "Bluetooth Kopfhörer",
    //     "description": "Kabellose Over-Ear Kopfhörer mit klaren Höhen und kräftigem Bass. Dank 20 Stunden Akkulaufzeit und komfortabler Ohrpolster ideal für lange Musik- oder Gaming-Sessions.",
    //     "specs": "battery life: 20h, color: Schwarz, connection: Bluetooth 5.0",
    //     "stock": 150,
    //     "price": 59.95
    //   }
    // ]);
  }

  ngOnDestroy(){
    this.supabase.removeChannel(this.productlistInsertChannel);
    this.supabase.removeChannel(this.productlistDeleteChannel);
  }

  async addProduct(product:ProductModel){
    // console.log(product.getCleanAddJson());
    const product_data = product.getCleanAddJson();
    const { data, error } = await this.supabase
    .from('products')
    .insert([
      product_data
    ])
    .select()
  }

  setProductDetailById(id:number){
    // let tmpProduct = this.productlist.find(product => product.name == name);
    let tmpProduct = this.productlist().find(product => product.id == id);
    if(tmpProduct){this.productdetail.set(tmpProduct);}

    // setTimeout(() => {
    //   this.productdetail.update(product => ({...product, description:'banana'}));
    // },2000);
  }

  async getAllProducts(){
    let response = await this.supabase
    .from('products')
    .select('*')
    // console.log(response.data);
    this.productlist.set((response.data ?? []) as Product[]);
  }

  async deleteProduct(id:number){
    const { error } = await this.supabase
    .from('products')
    .delete()
    .eq('id', id)
  }  
}
