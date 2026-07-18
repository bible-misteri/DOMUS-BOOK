import json

class GraphSerializer:

    def export(self, graph):

        return json.dumps({

            "nodes": list(graph.nodes.keys()),

            "edges": len(graph.edges)

        })
