package ArtSystem;

public class AreaVisitor implements Visitor {
    private double totalArea = 0;

    public double getTotalArea() {
        return totalArea;
    }

    @Override
    public void visit(Kid kid) {
        totalArea += kid.getArea();
    }

    @Override
    public void visit(Tree tree) {
        totalArea += tree.getArea();
    }

    @Override
    public void visit(Boat boat) {
        totalArea += boat.getArea();
    }

    @Override
    public void visit(Flag flag) {
        totalArea += flag.getArea();
    }

    @Override
    public void visit(Kite kite) {
        totalArea += kite.getArea();
    }

    @Override
    public void visit(Painting painting) {

    }

    @Override
    public void visit(Island island) {
        totalArea += island.getArea();
        for (Element child : island.getElements()) {
            child.accept(this);
        }
    }

    @Override
    public void visit(Lake lake) {
        totalArea += lake.getArea();
        for (Element child : lake.getElements()) {
            child.accept(this);
        }
    }
}
