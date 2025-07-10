export type PropertyKey = ClassFieldDecoratorContext<any> | string;


export function wa(v: PropertyKey): string {
  if (typeof v === "string") return v;
  return v.name.toString();
}
