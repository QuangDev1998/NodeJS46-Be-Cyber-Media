import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const roleServices = {
  create: async function (req) {
    return `This action create`;
  },

  findAll: async function (req) {
    let { page, pageSize, search } = req.query;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;
    search = search || ``;
    const whereSearch =
      search.trim() === `` ? {} : { name: { contains: search } };
    const where = { ...whereSearch };
    const skip = (page - 1) * pageSize;
    const totalItem = await prisma.roles.count({ where: where });
    const totalPage = Math.ceil(totalItem / pageSize);
    const roles = await prisma.roles.findMany({
      take: pageSize,
      skip: skip,
      orderBy: {
        created_at: `desc`, // sắp xếp giảm dần : đưa video mới nhất lên trên đầu
      },
      where: where,
    });

    return {
      page, // trang hiện tại
      pageSize, // kích thước item trong 1 page: 10 video trong một page
      totalPage, // tổng cộng bao nhiêu trang
      totalItem, // tổng cộng có bao nhiêu video
      items: roles || [],
    };
  },

  findOne: async function (req) {
    const { id } = req.params;
    const role = await prisma.roles.findUnique({
      where: {
        role_id: +id, // thêm dấu + để chuyển từ chuổi sang number vì dữ liệu gủi ở params luôn là chuỗi
      },
    });
    return role;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} role`;
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} role`;
  },

  togglePermission: async (req) => {
    const { role_id, permission_id } = req.body;
    console.log({ role_id, permission_id });
    let rolePermissionExists = await prisma.role_permissions.findFirst({
      where: {
        role_id: role_id,
        permission_id: permission_id,
      },
    });

    if (rolePermissionExists) {
      // nếu đã tồn tại thì cập nhật lại trạng thái is_active ( lật lại 1 thành 0, 0 thành 1 ) => (bật / tắt)
      rolePermissionExists = await prisma.role_permissions.update({
        where: {
          role_permissions_id: rolePermissionExists.role_permissions_id,
        },
        data: {
          is_active: !rolePermissionExists.is_active,
        },
      });
    } else {
      // nếu chưa tồn tại thì tạo mới
      rolePermissionExists = await prisma.role_permissions.create({
        data: {
          role_id: role_id,
          permission_id: permission_id,
          is_active: true,
        },
      });
    }
    return rolePermissionExists;
  },
};
