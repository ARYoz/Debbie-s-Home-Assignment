package ArtSystem;

public class ShortPrintVisitor implements Visitor {
    @Override
    public void visit(Kid kid) {
        System.out.println(kid.getFullName());
    }

    @Override
    public void visit(Tree tree) {
        System.out.println(tree.getFullName());
    }

    @Override
    public void visit(Boat boat) {
        System.out.println(boat.getFullName());
    }

    @Override
    public void visit(Flag flag) {
        System.out.println(flag.getFullName());
    }

    @Override
    public void visit(Kite kite) {
        System.out.println(kite.getFullName());
    }

    @Override
    public void visit(Painting painting) {

    }

    @Override
    public void visit(Island island) {
        System.out.println(island.getFullName());
        for (Element child : island.getElements()) {
            child.accept(this);
        }
    }

    @Override
    public void visit(Lake lake) {
        System.out.println(lake.getFullName());
        for (Element child : lake.getElements()) {
            child.accept(this);
        }
    }
}
