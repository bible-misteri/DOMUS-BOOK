from .context import AIContext

class ContextAssembler:

    def assemble(self, sources):

        ctx = AIContext()

        ctx.project = sources.project()

        ctx.chapter = sources.chapter()

        ctx.glossary = sources.glossary()

        ctx.bibliography = sources.bibliography()

        ctx.references = sources.references()

        ctx.knowledge = sources.knowledge()

        ctx.memory = sources.memory()

        return ctx
