function topologicalSort(models: any[]) {
    const graph = buildDependencyGraph(models);
    const visited: Set<string> = new Set();
    const sorted: string[] = [];
  
    function visit(modelName: string) {
      if (!visited.has(modelName)) {
        visited.add(modelName);
        const dependencies = graph[modelName] || [];
        dependencies.forEach(visit);
        sorted.push(modelName);
      }
    }
  
    models.forEach(({ modelName }) => visit(modelName));
  
    return sorted.reverse(); // L'ordine topologico è invertito
  }
  
  function buildDependencyGraph(models: any[]) {
    const graph: Record<string, string[]> = {};
  
    models.forEach(({ modelName, fields }) => {
      graph[modelName] = [];
      // @ts-ignore
      fields.forEach(({ field, type }) => {
        if (type === 'User') {
          graph[modelName].push('User'); // Esempio di relazione
        }
      });
    });
  
    return graph;
  }
  
  export { topologicalSort };
  