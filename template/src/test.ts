requireAll((<any>require).context('./', true, /spec.ts$/));
function requireAll(r: any): any {
    console.log(r.keys());
    r.keys().forEach(r);
}
