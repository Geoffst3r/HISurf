"""empty message

Revision ID: 6e3a3971652a
Revises: 5f908a02808b
Create Date: 2022-01-21 21:00:56.667992

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6e3a3971652a'
down_revision = '5f908a02808b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('surfboards', sa.Column('image', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('surfboards', 'image')
    # ### end Alembic commands ###
