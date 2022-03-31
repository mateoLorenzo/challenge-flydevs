export class PokemonQuickView {
   constructor(
      readonly image: string,
      readonly name: string,
      readonly id: number,
      readonly types: string[],
      readonly height: number,
      readonly weight: number,
   ) { }
}
