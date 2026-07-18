class GraphQuery:

    def __init__(self, graph):

        self.graph = graph

    def find(self, node_id):

        return self.graph.nodes.get(node_id)

    def neighbors(self, node_id):

        return [

            e for e in self.graph.edges

            if e.source == node_id

        ]
