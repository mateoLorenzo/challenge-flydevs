export class PokemonDetail {
   constructor(
      readonly image: string,
      readonly name: string,
      readonly id: number,
      readonly types: string[],
      readonly height: number,
      readonly weight: number,
      readonly description: string,
      readonly gender: string,
      readonly habitat: string,
   ) { }
}
