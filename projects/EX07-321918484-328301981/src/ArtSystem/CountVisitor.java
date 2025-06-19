package ArtSystem;

public class CountVisitor implements Visitor {
    private int count = 0;

    public int getCount() {
        return count;
    }

    @Override
    public void visit(Kid kid) {
        count++;
    }

    @Override
    public void visit(Tree tree) {
        count++;
    }

    @Override
    public void visit(Boat boat) {
        count++;
    }

    @Override
    public void visit(Flag flag) {
        count++;
    }

    @Override
    public void visit(Kite kite) {
        count++;
    }

    @Override
    public void visit(Painting painting) {

    }

    @Override
    public void visit(Island island) {
        count++;
        for (Element child : island.getElements()) {
            child.accept(this);
        }
    }

    @Override
    public void visit(Lake lake) {
        count++;
        for (Element child : lake.getElements()) {
            child.accept(this);
        }
    }
}
